"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type ActionTypeProps = {
  label: string;
  children: React.ReactNode;
  side?: "right" | "left" | "top" | "bottom";
  align?: "start" | "center" | "end";
};

const ActionToolTip = ({ label, children, side, align }: ActionTypeProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent align={align} side={side}>
          <p className="text-sm font-semibold capitalize">
            {label.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionToolTip;
