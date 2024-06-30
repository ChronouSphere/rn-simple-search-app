import axios from 'axios';
import {BASE_API_URL} from '../../constants';

const getOrganizationList = async (
  pageNumber: string,
): Promise<Module.FetchItemApiResponse | unknown> => {
  try {
    const axiosConfig = {
      method: 'get',
      url: `${BASE_API_URL}?q=public&page=${pageNumber}`,
    };
    const response: any = await axios(axiosConfig);
    const organizationList: Module.OrganizationItem[] =
      response?.data?.organizations;
    if (organizationList.length > 0) {
      return organizationList;
    }
  } catch (error) {
    return undefined;
  }
};

const getSearchOrganizationList = async (
  query: string,
): Promise<Module.FetchItemApiResponse | unknown> => {
  try {
    const axiosConfig = {
      method: 'get',
      url: `${BASE_API_URL}?q=${query}`,
    };
    const response: any = await axios(axiosConfig);
    const organizationList: Module.OrganizationItem[] =
      response?.data?.organizations;
    if (organizationList.length > 0) {
      return organizationList;
    }
  } catch (error) {
    return undefined;
  }
};

export {getOrganizationList, getSearchOrganizationList};
