import React, { useEffect } from "react";
import { styled } from "~/stitches.config";
import { Card } from "../Card";
import { Container } from "../Container";

const DialogWrapper = styled("dialog", {
  border: "none",
  background: "transparent",
  boxSizing: "border-box",
  position: "absolute",
  height: "100%",
  width: "100%",
  bottom: 0,
  top: 0,
  left: 0,
  padding: 0,
});

const DialogOverlay = styled("div", {
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
});

const DialogInner = styled("div", {
  maxHeight: "$sizes$treeHeight",
  width: "$sizes$dialog",
  overflowY: "auto",
});

export const DialogTitle = styled("h1", {
  fontFamily: "$title",
  padding: "$spacing$8",
  fontSize: "$uranus",
});

export const DialogCloseButton = styled("button", {
  border: "none",
  background: "none",
  fontSize: "$earth",
  cursor: "pointer",
});

export interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}
export const Dialog = ({ children, open, onClose }: DialogProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "revert";
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <DialogWrapper open={open} onKeyDown={handleKeyDown}>
      <DialogOverlay>
        <Container>
          <Card boxShadow={"heavy"}>
            <DialogInner>{children}</DialogInner>
          </Card>
        </Container>
      </DialogOverlay>
    </DialogWrapper>
  );
};
