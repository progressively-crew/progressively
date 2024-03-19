import { Dialog, DialogCloseBtn } from "~/components/Dialog/Dialog";
import { getDistinctViewport } from "../services/getDistinctViewport";

export const ViewportDialog = () => {
  //getDistinctViewport();
  return (
    <Dialog
      title="Select a viewport"
      closeBtn={<DialogCloseBtn to={"/"} label={"Close"} />}
    >
      fzafza
    </Dialog>
  );
};
