import { API_ERRORS } from "@config/api";
import {
  DEFAULT_PRODUCTS_LIMIT,
  DEFAULT_PRODUCTS_OFFSET,
  INIT_PRODUCTS_COUNT,
} from "@config/constants";
import ApiError from "@customTypes/ApiError";
import { ILocalStore } from "@customTypes/ILocalStore";
import { LoadingStatus } from "@customTypes/LoadingStatus";
import Product from "@customTypes/Product";
import { getAllProducts, getProductsRange } from "@services/products";
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
  | "_totalProductsCount"
  | "_offset"
  | "_loadingStatus"
  | "_loadingError";

export default class ProductStore implements ILocalStore {
  private _products: Product[] = [];
  private _productsInRange: Product[] = [];
  private _totalProductsCount: number = INIT_PRODUCTS_COUNT;
  private _offset: number = DEFAULT_PRODUCTS_OFFSET;
  private _loadingStatus: LoadingStatus = LoadingStatus.INITIAL;
  private _loadingError: ApiError = API_ERRORS.initial;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _products: observable.ref,
      _productsInRange: observable.ref,
      _totalProductsCount: observable,
      _offset: observable,
      _loadingStatus: observable,
      _loadingError: observable,
      products: computed,
      setProductsInRange: action.bound,
      totalProductsCount: computed,
      offset: computed,
      setOffset: action,
      loadingStatus: computed,
      loadingError: computed,
      getTotalProductsCount: action,
      getAllProducts: action,
      getProductsInRange: action,
      destroy: action,
    });
    this.getTotalProductsCount();
  }

  get products(): Product[] {
    return this._products;
  }

  setProductsInRange() {
    if (this._loadingStatus === LoadingStatus.SUCCESS) {
      this._products = [...this._products, ...this._productsInRange];
    }
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

  get loadingStatus(): LoadingStatus {
    return this._loadingStatus;
  }

  get loadingError(): ApiError {
    return this._loadingError;
  }

  private _initializeRequest() {
    runInAction(() => {
      this._loadingStatus = LoadingStatus.PENDING;
      this._loadingError = API_ERRORS.initial;
    });
  }

  private _hasResponseError(response: Product[] | ApiError): boolean {
    if (!response) {
      this._loadingStatus = LoadingStatus.FAIL;
      this._loadingError = API_ERRORS.serverIsNotResponding;
      return true;
    }

    if ("code" in response) {
      this._loadingStatus = LoadingStatus.FAIL;
      this._loadingError = API_ERRORS.fallback;
      return true;
    }

    return false;
  }

  async getTotalProductsCount(): Promise<void> {
    this._initializeRequest();
    const response = await getAllProducts();

    runInAction(() => {
      const hasError = this._hasResponseError(response);

      if (!hasError) {
        this._loadingStatus = LoadingStatus.SUCCESS;
        this._totalProductsCount = (response as Product[]).length;
      }
    });
  }

  async getAllProducts(): Promise<void> {
    this._initializeRequest();
    this._products = [];

    const response = await getAllProducts();

    runInAction(() => {
      const hasError = this._hasResponseError(response);

      if (!hasError) {
        this._loadingStatus = LoadingStatus.SUCCESS;
        this._products = response as Product[];
      }
    });
  }

  async getProductsInRange(offset: number): Promise<void> {
    this._initializeRequest();

    const response = await getProductsRange({
      offset: offset,
      limit: DEFAULT_PRODUCTS_LIMIT,
    });

    runInAction(() => {
      const hasError = this._hasResponseError(response);

      if (!hasError) {
        this._loadingStatus = LoadingStatus.SUCCESS;
        this._productsInRange = response as Product[];
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
     * starts working... So in order to get the app working this.destroy()
     * must stay inactive for now.
     */
    // this._offsetReaction();
  }
}
