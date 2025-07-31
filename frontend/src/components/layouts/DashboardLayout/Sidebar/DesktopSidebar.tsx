import { Link, useLocation } from "react-router-dom";
import { ILink } from "..";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface IProps {
  links: ILink[];
}

const DesktopSidebar = ({ links }: IProps) => {
  const location = useLocation();

  const isRouteMatched = (matchers?: string[]) => {
    if (!matchers) return false;
    return matchers.some((matcher) => {
      return (
        location.pathname === matcher || location.pathname.startsWith(matcher)
      );
    });
  };

  return (
    <div className="flex w-max max-w-[100px] flex-col gap-6 rounded-full border border-zinc-200 bg-white px-4 py-8">
      {links.map((item, idx) => {
        const isMatched = isRouteMatched(item.matchers);

        if (item?.children && item.children.length > 0) {
          return (
            <TooltipProvider key={`route-${item.title}-${idx}`}>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger showIcon={false}>
                        <div
                          className={cn(
                            "flex size-11 items-center justify-center rounded-full border border-zinc-100 bg-zinc-100 transition-all hover:border-primary/50 hover:bg-primary/20",
                            isMatched &&
                              "border-primary bg-primary text-white hover:bg-primary/90 hover:text-white",
                          )}
                        >
                          <item.icon />
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {item.children.map((childItem, childIdx) => {
                          const isChildMatched = isRouteMatched(
                            childItem.matchers,
                          );
                          return (
                            <TooltipProvider
                              key={`route-${childItem.title}-${idx}`}
                            >
                              <Tooltip delayDuration={200}>
                                <TooltipTrigger asChild>
                                  <Link
                                    key={`route-${childItem.title}-${childIdx}`}
                                    to={childItem.path}
                                  >
                                    <div
                                      className={cn(
                                        "mb-2 ml-3 flex size-11 items-center justify-center rounded-full border border-zinc-100 bg-zinc-100 transition-all hover:border-primary/50 hover:bg-primary/20",
                                        isChildMatched &&
                                          "border-primary bg-primary text-white hover:bg-primary/90 hover:text-white",
                                      )}
                                    >
                                      <childItem.icon />
                                    </div>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent
                                  side="right"
                                  sideOffset={5}
                                  className="px-3 py-1"
                                >
                                  <p className="text-sm font-medium">
                                    {childItem.title}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          );
                        })}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={5}
                  className="px-3 py-1"
                >
                  <p className="text-sm font-medium">{item.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        } else {
          return (
            <TooltipProvider key={`route-${item.title}-${idx}`}>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <Link to={item.path} key={idx}>
                    <div
                      className={cn(
                        "flex size-11 items-center justify-center rounded-full border border-zinc-100 bg-zinc-100 transition-all hover:border-primary/50 hover:bg-primary/20",
                        isMatched &&
                          "border-primary bg-primary text-white hover:bg-primary/90 hover:text-white",
                      )}
                    >
                      <item.icon />
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={5}
                  className="px-3 py-1"
                >
                  <p className="text-sm font-medium">{item.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        }
      })}
    </div>
  );
};

export default DesktopSidebar;
