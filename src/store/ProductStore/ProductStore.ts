import { API_ERRORS } from "@config/api";
import {
  DEFAULT_PRODUCTS_LIMIT,
  DEFAULT_PRODUCTS_OFFSET,
  INIT_PRODUCTS_COUNT,
} from "@config/constants";
import ApiError from "@customTypes/ApiError";
import EntityType from "@customTypes/EntityType";
import GetFilteredProducts from "@customTypes/GetFilteredProducts";
import { ILocalStore } from "@customTypes/ILocalStore";
import { LoadingStatus } from "@customTypes/LoadingStatus";
import Product from "@customTypes/Product";
import {
  getAllProducts,
  getProductById,
  getFilteredProducts,
  getProductsRange,
} from "@services/products";
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
  | "_relatedProducts"
  | "_totalProductsCount"
  | "_offset"
  | "_productsLoadingStatus"
  | "_relatedProductsLoadingStatus"
  | "_selectedProductLoadingStatus"
  | "_productsLoadingError"
  | "_relatedProductsLoadingError"
  | "_selectedProductLoadingError";

export default class ProductStore implements ILocalStore {
  private _products: Product[] = [];
  private _selectedProduct: Product | null = null;
  private _productsInRange: Product[] = [];
  private _relatedProducts: Product[] = [];
  private _totalProductsCount: number = INIT_PRODUCTS_COUNT;
  private _offset: number = DEFAULT_PRODUCTS_OFFSET;
  private _productsLoadingStatus: LoadingStatus = LoadingStatus.INITIAL;
  private _relatedProductsLoadingStatus: LoadingStatus = LoadingStatus.INITIAL;
  private _selectedProductLoadingStatus: LoadingStatus = LoadingStatus.INITIAL;
  private _productsLoadingError: ApiError = API_ERRORS.initial;
  private _relatedProductsLoadingError: ApiError = API_ERRORS.initial;
  private _selectedProductLoadingError: ApiError = API_ERRORS.initial;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _products: observable.ref,
      _productsInRange: observable.ref,
      _relatedProducts: observable.ref,
      _selectedProduct: observable.ref,
      _totalProductsCount: observable,
      _offset: observable,
      _productsLoadingStatus: observable,
      _relatedProductsLoadingStatus: observable,
      _selectedProductLoadingStatus: observable,
      _productsLoadingError: observable.ref,
      _relatedProductsLoadingError: observable.ref,
      _selectedProductLoadingError: observable.ref,
      products: computed,
      selectedProduct: computed,
      relatedProducts: computed,
      totalProductsCount: computed,
      offset: computed,
      productsLoadingStatus: computed,
      relatedProductsLoadingStatus: computed,
      selectedProductLoadingStatus: computed,
      productsLoadingError: computed,
      relatedProductsLoadingError: computed,
      selectedProductLoadingError: computed,
      setProductsInRange: action.bound,
      setOffset: action.bound,
      getAllProducts: action,
      getProductById: action,
      getProductsInRange: action,
      getFilteredProducts: action,
      getTotalProductsCount: action,
      destroy: action,
    });
    this.getTotalProductsCount();
  }

  get products(): Product[] {
    return this._products;
  }

  get selectedProduct(): Product | null {
    return this._selectedProduct;
  }

  setProductsInRange() {
    if (this._productsLoadingStatus === LoadingStatus.PENDING) {
      this._products = [...this._products, ...this._productsInRange];
      this._productsLoadingStatus = LoadingStatus.SUCCESS;
    }
  }

  get relatedProducts() {
    return this._relatedProducts;
  }

  get offset(): number {
    return this._offset;
  }

  setOffset(offset: number) {
    this._offset = offset;
  }

  get totalProductsCount(): number {
    return this._totalProductsCount;
  }

  get productsLoadingStatus(): LoadingStatus {
    return this._productsLoadingStatus;
  }

  get relatedProductsLoadingStatus(): LoadingStatus {
    return this._productsLoadingStatus;
  }

  get selectedProductLoadingStatus(): LoadingStatus {
    return this._productsLoadingStatus;
  }

  get productsLoadingError(): ApiError {
    return this._productsLoadingError;
  }

  get relatedProductsLoadingError(): ApiError {
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
    switch (entityType) {
      case EntityType.PRODUCTS:
        this._productsLoadingStatus = loadingStatus;
        this._productsLoadingError = error;
        break;

      case EntityType.RELATED_PRODUCTS:
        this._relatedProductsLoadingStatus = loadingStatus;
        this._relatedProductsLoadingError = error;
        break;

      case EntityType.SELECTED_PRODUCT:
        this._selectedProductLoadingStatus = loadingStatus;
        this._selectedProductLoadingError = error;
        break;

      default:
        break;
    }
  }

  private _initializeRequest(entityType: EntityType) {
    runInAction(() => {
      this._setStatusAndError(
        entityType,
        LoadingStatus.PENDING,
        API_ERRORS.initial
      );
    });
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

  async getProductsInRange(offset: number): Promise<void> {
    this._initializeRequest(EntityType.PRODUCTS);

    const response = await getProductsRange({
      offset: offset,
      limit: DEFAULT_PRODUCTS_LIMIT,
    });

    runInAction(() => {
      const hasError = this._hasResponseError(response, EntityType.PRODUCTS);

      if (!hasError) {
        this._productsLoadingStatus = LoadingStatus.PENDING;
        this._productsInRange = response as Product[];
      }
    });
  }

  async getFilteredProducts({
    title,
    price,
    price_min,
    price_max,
    categoryId,
    offset,
    limit,
  }: GetFilteredProducts): Promise<void> {
    this._initializeRequest(EntityType.PRODUCTS);

    const response = await getFilteredProducts({
      title,
      price,
      price_min,
      price_max,
      categoryId,
      offset,
      limit,
    });

    runInAction(() => {
      const hasError = this._hasResponseError(response, EntityType.PRODUCTS);

      if (!hasError) {
        this._productsLoadingStatus = LoadingStatus.SUCCESS;
        this._products = response as Product[];
        this._totalProductsCount = (response as Product[]).length;
      }
    });
  }

  async getProductsByCategory({
    categoryId,
    offset,
    limit,
  }: GetFilteredProducts): Promise<void> {
    this._initializeRequest(EntityType.RELATED_PRODUCTS);

    const response = await getFilteredProducts({
      categoryId,
      offset,
      limit,
    });

    runInAction(() => {
      const hasError = this._hasResponseError(
        response,
        EntityType.RELATED_PRODUCTS
      );

      if (!hasError) {
        this._relatedProductsLoadingStatus = LoadingStatus.SUCCESS;
        this._relatedProducts = response as Product[];
      }
    });
  }

  async getTotalProductsCount(): Promise<void> {
    const response = await getAllProducts();

    runInAction(() => {
      const hasError = this._hasResponseError(response, EntityType.PRODUCTS);

      if (!hasError) {
        this._totalProductsCount = (response as Product[]).length;
      }
    });
  }

  private readonly _offsetReaction: IReactionDisposer = reaction(
    () => this._offset,
    async (currentOffset) => {
      await this.getProductsInRange(currentOffset);
      this.setProductsInRange();
    }
  );

  destroy(): void {
    /**
     * I could not solve the problem with React Strict mode, which
     * calls this method and kills all reactions before the app even
     * starts working... So in order to get the app working this.destroy
     * must stay inactive for now.
     */
    // this._offsetReaction();
  }
}
