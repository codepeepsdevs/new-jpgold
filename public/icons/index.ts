import { AuthApple, AuthFacebook, AuthGoogle, CheckCircle } from "./auth";
import { UploadIcon } from "./profile";
import { toastSuccessIcon, toastErrorIcon } from "./toast";

const home = {};

const auth = { AuthApple, AuthFacebook, AuthGoogle, CheckCircle };

const about = {};

const marketplace = {};

const team = {};

const cart = {};

const profile = { UploadIcon };

export default {
  home,
  about,
  marketplace,
  cart,
  team,
  auth,
  toastSuccessIcon,
  toastErrorIcon,
  profile,
};
