import { AuthApple, AuthFacebook, AuthGoogle, CheckCircle } from "./auth";
import { UploadIcon } from "./profile";
import { toastSuccessIcon, toastErrorIcon } from "./toast";

import nftWorth from "./dashboard/worth.png";
import nftTotal from "./dashboard/total.png";
import nftListed from "./dashboard/listed.png";
import nftWallet from "./dashboard/wallet.png";

const home = {};

const auth = { AuthApple, AuthFacebook, AuthGoogle, CheckCircle };

const about = {};

const marketplace = {};

const team = {};

const cart = {};

const profile = { UploadIcon };

const dashboard = { nftWorth, nftTotal, nftListed, nftWallet };

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
  dashboard,
};
