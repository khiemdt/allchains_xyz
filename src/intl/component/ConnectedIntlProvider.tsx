import { IntlProvider } from "react-intl";
import { connect } from "react-redux";
import { AppState } from "../../redux/reducer";
import vi from "../translate/vi.json";
import en from "../translate/en.json";

function getMessages(locale: string) {
  if (locale === "en") {
    return en;
  }
  return vi;
}

function mapStateToProps(state: AppState) {
  return {
    locale: state.intl.locale,
    messages: getMessages(state.intl.locale),
  };
}

export default connect(mapStateToProps)(IntlProvider);
