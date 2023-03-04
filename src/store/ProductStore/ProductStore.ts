import { API_ERRORS } from "@config/api";
import {
  DEFAULT_MAX_PRODUCTS_LIMIT,
  DEFAULT_PRODUCTS_OFFSET,
  INIT_PRODUCTS_COUNT,
} from "@config/constants";
import ApiError from "@customTypes/ApiError";
import EntityType from "@customTypes/EntityType";
import GetFilteredProductsConfig from "@customTypes/GetFilteredProductsConfig";
import { ILocalStore } from "@customTypes/ILocalStore";
import { LoadingStatus } from "@customTypes/LoadingStatus";
import {
  getAllProducts,
  getProductById,
  getFilteredProducts,
} from "@services/products";
import { Product } from "@store/models/platziStore";
import rootStore from "@store/RootStore";
import fetchFilteredProducts from "@utils/fetchFilteredProducts";
import shouldProductsRefresh from "@utils/shouldProductsRefresh";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";

type PrivateFields =
  | "_products"
  | "_productsInRange"
  | "_selectedProduct"
  | "_totalProductsCount"
  | "_productsLoadingStatus"
  | "_selectedProductLoadingStatus"
  | "_productsLoadingError"
  | "_selectedProductLoadingError";

export default class ProductStore implements ILocalStore {
  private _products: Product[] = [];
  private _selectedProduct: Product | null = null;
  private _productsInRange: Product[] = [];
  private _totalProductsCount: number = INIT_PRODUCTS_COUNT;
  private _productsLoadingStatus: LoadingStatus = LoadingStatus.INITIAL;
  private _selectedProductLoadingStatus: LoadingStatus = LoadingStatus.INITIAL;
  private _productsLoadingError: ApiError = API_ERRORS.initial;
  private _selectedProductLoadingError: ApiError = API_ERRORS.initial;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _products: observable.ref,
      _productsInRange: observable.ref,
      _selectedProduct: observable.ref,
      _totalProductsCount: observable,
      _productsLoadingStatus: observable,
      _selectedProductLoadingStatus: observable,
      _productsLoadingError: observable.ref,
      _selectedProductLoadingError: observable.ref,
      products: computed,
      selectedProduct: computed,
      totalProductsCount: computed,
      productsLoadingStatus: computed,
      selectedProductLoadingStatus: computed,
      productsLoadingError: computed,
      selectedProductLoadingError: computed,
      getAllProducts: action,
      getProductById: action,
      getFilteredProducts: action,
      getTotalProductsCount: action,
      destroy: action,
    });
  }

  get products(): Product[] {
    return this._products;
  }

  get selectedProduct(): Product | null {
    return this._selectedProduct;
  }

  get totalProductsCount(): number {
    return this._totalProductsCount;
  }

  get productsLoadingStatus(): LoadingStatus {
    return this._productsLoadingStatus;
  }

  get selectedProductLoadingStatus(): LoadingStatus {
    return this._productsLoadingStatus;
  }

  get productsLoadingError(): ApiError {
    return this._productsLoadingError;
  }

  get selectedProductLoadingError(): ApiError {
    return this._productsLoadingError;
  }

  private _setStatusAndError(
    entityType: EntityType,
    loadingStatus: LoadingStatus,
    error: ApiError
  ) {
    runInAction(() => {
      switch (entityType) {
        case EntityType.PRODUCTS:
          this._productsLoadingStatus = loadingStatus;
          this._productsLoadingError = error;
          break;

        case EntityType.SELECTED_PRODUCT:
          this._selectedProductLoadingStatus = loadingStatus;
          this._selectedProductLoadingError = error;
          break;

        default:
          break;
      }
    });
  }

  private _initializeRequest(entityType: EntityType) {
    this._setStatusAndError(
      entityType,
      LoadingStatus.PENDING,
      API_ERRORS.initial
    );
  }

  private _hasResponseError(
    response: Product[] | Product | ApiError,
    entityType: EntityType
  ): boolean {
    if (!response) {
      this._setStatusAndError(
        entityType,
        LoadingStatus.FAIL,
        API_ERRORS.serverIsNotResponding
      );

      return true;
    }

    if ("code" in response) {
      this._setStatusAndError(
        entityType,
        LoadingStatus.FAIL,
        API_ERRORS.fallback
      );

      return true;
    }

    return false;
  }

  async getAllProducts(): Promise<void> {
    this._initializeRequest(EntityType.PRODUCTS);
    this._products = [];

    const response = await getAllProducts();

    runInAction(() => {
      const hasError = this._hasResponseError(response, EntityType.PRODUCTS);

      if (!hasError) {
        this._productsLoadingStatus = LoadingStatus.SUCCESS;
        this._products = response as Product[];
      }
    });
  }

  async getProductById(productId: number): Promise<void> {
    this._initializeRequest(EntityType.SELECTED_PRODUCT);

    const response = await getProductById({ productId });

    runInAction(() => {
      const hasError = this._hasResponseError(
        response,
        EntityType.SELECTED_PRODUCT
      );

      if (!hasError) {
        this._selectedProductLoadingStatus = LoadingStatus.SUCCESS;
        this._selectedProduct = response as Product;
      }
    });
  }

  async getFilteredProducts(
    queryParams: GetFilteredProductsConfig,
    refresh = true
  ): Promise<void> {
    this._initializeRequest(EntityType.PRODUCTS);

    const response = await getFilteredProducts(queryParams);

    runInAction(() => {
      const hasError = this._hasResponseError(response, EntityType.PRODUCTS);

      if (hasError) return;

      this._productsLoadingStatus = LoadingStatus.SUCCESS;
      if (refresh) {
        this._products = response as Product[];
        this.getTotalProductsCount(queryParams);
      } else {
        this._productsInRange = response as Product[];
        this._products = [...this._products, ...this._productsInRange];
      }
    });
  }

  async getTotalProductsCount(
    queryParams: GetFilteredProductsConfig = {}
  ): Promise<void> {
    const response = await getFilteredProducts({
      ...queryParams,
      offset: DEFAULT_PRODUCTS_OFFSET,
      limit: DEFAULT_MAX_PRODUCTS_LIMIT,
    });

    runInAction(() => {
      const hasError = this._hasResponseError(response, EntityType.PRODUCTS);

      if (!hasError) {
        this._totalProductsCount = (response as Product[]).length;
      }
    });
  }

  private readonly _offsetReaction: IReactionDisposer = reaction(
    () => rootStore.query.changedParams,
    async (changedParams) => {
      const shouldRefresh = shouldProductsRefresh(changedParams);
      fetchFilteredProducts(this, shouldRefresh);
    }
  );

  destroy(): void {
    /**
     * I could not solve the problem with React Strict mode, which
     * calls this method and kills all reactions before the app even
     * starts working... So in order to get the app working this.destroy
     * must stay inactive for now.
     */
    this._offsetReaction();
  }
}
