declare namespace Module {
  //#region api payload
  interface RequestPayload {
    pageNumber: string;
  }

  interface FetchItemApiResponse {
    organizations: Item[];
  }
  //#end region

  namespace Action {
    interface RequestFetchApiPayload {
      pageNumber: number;
    }
    interface RequestFetchSuccess {
      listItems: Item[];
    }
    interface RequestSearchApiPayload {
      query: string;
    }
  }

  interface OrganizationItem {
    ein: string;
    strein: string;
    name: string;
    sub_name: string;
    city: string;
    state: CITY;
    ntee_code: string;
    raw_ntee_code: string;
    subseccd: number;
    has_subseccd: boolean;
    have_filings: boolean;
    have_extracts: boolean;
    have_pdfs: boolean;
    score: number;
  }

  type CITY = 'KY' | 'LF';

  declare namespace State {
    interface AppState {
      listItems: OrganizationItem[] | [];
      searchOrganizationItem: OrganizationItem[] | [];
    }
  }
}
