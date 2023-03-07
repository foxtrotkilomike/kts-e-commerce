import { DEFAULT_CATEGORY_ID, DEFAULT_FILTER_VALUE } from "@config/constants";
import { ILocalStore } from "@customTypes/ILocalStore";
import { Option } from "@customTypes/Option";
import QueryParams from "@customTypes/QueryParams";
import { getAllCategories } from "@services/categories";
import {
  CategoryModelApi,
  normalizeCategoriesToOptions,
} from "@store/models/platziStore";
import rootStore from "@store/RootStore";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";

type PrivateFields = "_options" | "_selectedOptionKey" | "_setOptions";

export default class SearchOptionsStore implements ILocalStore {
  private _options: Option[] = [];
  private _selectedOptionKey: Option["key"] = DEFAULT_CATEGORY_ID;
  private _resetOption: Option = {
    key: DEFAULT_CATEGORY_ID,
    value: DEFAULT_FILTER_VALUE,
  };

  constructor() {
    makeObservable<SearchOptionsStore, PrivateFields>(this, {
      _options: observable.ref,
      _selectedOptionKey: observable,
      options: computed,
      selectedOption: computed,
      setSelectedOption: action.bound,
      _setOptions: action,
    });
    this._setOptions();
  }

  get options(): Option[] {
    return this._options;
  }

  get selectedOption(): Option["key"] {
    return this._selectedOptionKey;
  }

  setSelectedOption(option: Option["key"]): void {
    this._selectedOptionKey = option;
  }

  private async _setOptions(): Promise<void> {
    const response = await getAllCategories();

    if (!response || "code" in response) return;

    const normalizedOptions = normalizeCategoriesToOptions(
      response as CategoryModelApi[]
    );
    runInAction(() => {
      this._options = [this._resetOption, ...normalizedOptions];
    });
  }

  private _queryOptionReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam(QueryParams.CATEGORY_ID),
    (currentCategory) => {
      const optionNumber = Number(currentCategory);
      const optionValue =
        Number.isNaN(optionNumber) || optionNumber === DEFAULT_CATEGORY_ID
          ? DEFAULT_CATEGORY_ID
          : optionNumber;
      this.setSelectedOption(optionValue);
    }
  );

  destroy() {
    this._queryOptionReaction();
  }
}
