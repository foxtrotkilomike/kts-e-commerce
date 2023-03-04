import QueryParams from "@customTypes/QueryParams";
import { QueryParamsStringified } from "@customTypes/QueryParamsStringified";
import { QueryParamValue } from "@customTypes/QueryParamValue";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import * as qs from "qs";

type PrivateFields = "_params" | "_prevParams" | "_changedParams";

export default class QueryParamsStore {
  private _params: QueryParamsStringified = {};
  private _prevParams: QueryParamsStringified = {};
  private _changedParams: string[] = [];
  private _searchQuery: string = "";

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      _prevParams: observable.ref,
      _changedParams: observable.ref,
      params: computed,
      changedParams: computed,
      setChangedParams: action,
      setSearchQuery: action,
    });
  }

  getParam(key: QueryParams): QueryParamValue {
    return this._params[key];
  }

  get params(): QueryParamsStringified {
    return this._params;
  }

  get changedParams(): string[] {
    return this._changedParams;
  }

  setChangedParams() {
    const changedParams = [];
    for (const key of Object.keys(this._prevParams)) {
      if (
        this._prevParams[key as QueryParams] !==
        this._params[key as QueryParams]
      ) {
        changedParams.push(key);
      }
    }

    for (const key of Object.keys(this._params)) {
      if (
        this._prevParams[key as QueryParams] !==
        this._params[key as QueryParams]
      ) {
        changedParams.push(key);
      }
    }

    this._changedParams = Array.from(new Set(changedParams));
  }

  setSearchQuery(searchQuery: string) {
    if (this._searchQuery !== searchQuery) {
      runInAction(() => {
        this._prevParams = this._params;
        this._searchQuery = searchQuery;
        this._params = qs.parse(searchQuery, {
          ignoreQueryPrefix: true,
        }) as QueryParamsStringified;
        this.setChangedParams();
      });
    }
  }
}
