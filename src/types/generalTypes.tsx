export interface SidebarItemProp {
  name: string;
  url: string;
  id: number;
}

export type RegisterFormValues = {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UserType = {
  username: string;
  email: string;
  role: string;
  post: number;
  status: boolean;
  lastLogin: string;
};

export type CategoriesType = {
  categories: string;
  about: string;
  post: number;
};

export type StateType = {
  state: string;
  about: string;
  post: number;
};

export type LGAType = {
  lga: string;
  about: string;
  post: number;
};

export type MDAType = {
  mdaCode: string;
  ministries: string;
  departments: string;
  agencies: string;
};

export type RegionType = {
  name: string;
};

export type InboxType = {
  username: string;
  email: string;
  role: string;
  subject: string;
};

export type Article = {
  publicId: string;
  image: string;
  category: string;
  title: string;
  content: string;
  date: string;
  isPromise: boolean;
  isBookmarked: boolean;
  isPromisedFulfilled: boolean;
  datePromiseMade: string;
  promiseDeadline: string;
  datePromiseFulfilled: string;
};
