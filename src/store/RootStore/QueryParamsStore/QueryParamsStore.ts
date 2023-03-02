import { action, makeObservable, observable } from "mobx";
import * as qs from "qs";

type PrivateFields = "_params";

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _searchQuery: string = "";

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearchQuery: action,
    });
  }

  getParam(
    key: string
  ): string | string[] | qs.ParsedQs | qs.ParsedQs[] | undefined {
    return this._params[key];
  }

  setSearchQuery(searchQuery: string) {
    searchQuery = searchQuery.startsWith("?")
      ? searchQuery.slice(1)
      : searchQuery;

    if (this._searchQuery !== searchQuery) {
      this._searchQuery = searchQuery;
      this._params = qs.parse(searchQuery);
    }
  }
}
