/* export const SET_PAGE_INFO = "UI/SET_PAGE_INFO";
export const SET_FORM_CONTROLS = "UI/SET_FORM_CONTROLS";
export const SET_FORM_ENABLE_EDIT = "UI/SET_FORM_ENABLE_EDIT";
export const SET_SHOW_SHORT_DESCRIPTION = "UI/SET_SHOW_SHORT_DESCRIPTION";
export const SET_SHOW_DESCRIPTION = "UI/SET_SHOW_DESCRIPTION";
export const SET_EDIT_PANEL = "UI/SET_EDIT_PANEL"; // will check for clean up */ 

export const SET_PAGE_INFO = "UI/SET_PAGE_INFO";
export const SET_FORM_CONTROLS = "UI/SET_FORM_CONTROLS";
export const SET_FORM_ENABLE_EDIT = "UI/SET_FORM_ENABLE_EDIT";
export const SET_SHOW_SHORT_DESCRIPTION = "UI/SET_SHOW_SHORT_DESCRIPTION";
export const SET_SHOW_DESCRIPTION = "UI/SET_SHOW_DESCRIPTION";
export const SET_EDIT_PANEL = "UI/SET_EDIT_PANEL";

export const setPageInfo = pageInfo => ({
  type: SET_PAGE_INFO,
  pageInfo
});

export const setFormControls = formControls => ({
  type: SET_FORM_CONTROLS,
  formControls
});

export const setFormEnableEdit = formEnableEdit => ({
  type: SET_FORM_ENABLE_EDIT,
  formEnableEdit
});

export const setShowShortDescription = showShortDescription => ({
  type: SET_SHOW_SHORT_DESCRIPTION,
  showShortDescription
});

export const setShowDescription = showDescription => ({
  type: SET_SHOW_DESCRIPTION,
  showDescription
});

export const setEditPanel = editPanel => ({
  type: SET_EDIT_PANEL,
  editPanel
});

//converted to functional componanent 08/24 already this is ok
export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_PAGE_INFO:
      return {
        ...state,
        pageInfo: action.pageInfo
      };
    case SET_SHOW_SHORT_DESCRIPTION:
      return {
        ...state,
        showShortDescription: action.showShortDescription
      };
    case SET_SHOW_DESCRIPTION:
      return {
        ...state,
        showDescription: action.showDescription
      };
    case SET_FORM_CONTROLS:
      return {
        ...state,
        formControls: action.formControls
      };
    case SET_FORM_ENABLE_EDIT:
      return {
        ...state,
        formEdit: {
          ...(state.formEdit || {}),
          formEnableEdit: action.formEnableEdit
        }
      };
    case SET_EDIT_PANEL:
      return {
        ...state,
        editPanel: action.editPanel
      };
    default:
      return state;
  }
}

