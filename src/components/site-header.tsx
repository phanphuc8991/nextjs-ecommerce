import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { BadgeCheck, CreditCard, Bell, LogOut } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center px-4 lg:px-6">
        <div className="flex w-full items-center">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-base font-medium">Documents</h1>
        </div>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[240px] p-0">
              <div className="text-sm">
                <div className="flex gap-2 items-center p-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>AV</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-sm leading-tight">
                    <span className="truncate font-semibold">Toby Belhome</span>
                    <span className="text-muted-foreground truncate text-xs">
                      hello@tobybelhome.com
                    </span>
                  </div>
                </div>
                <div className="w-full bg-border h-px"></div>
                <ul className="p-1 font-outfit">
                  <li>
                    <Link
                      href=""
                      className="flex gap-2 items-center py-1.5 px-2 hover:bg-[#e4e4e8] rounded-sm"
                    >
                      <span>
                        <BadgeCheck className="text-[#acacac] w-4 h-4" />
                      </span>
                      <span className="text-sm">Account</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href=""
                      className="flex gap-2 items-center py-1.5  px-2 hover:bg-[#e4e4e8] rounded-sm"
                    >
                      <span>
                        <CreditCard className="text-[#acacac] w-4 h-4" />
                      </span>
                      <span className="text-sm">Billing</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href=""
                      className="flex gap-2 items-center py-1.5  px-2 hover:bg-[#e4e4e8] rounded-sm"
                    >
                      <span>
                        <Bell className="text-[#acacac] w-4 h-4" />
                      </span>
                      <span className="text-sm">Notification</span>
                    </Link>
                  </li>
                </ul>
                <div className="w-full bg-border h-px"></div>
                <div className="p-1 cursor-pointer">
                  <div className="flex gap-2 items-center py-1.5  px-2 hover:bg-[#e4e4e8] rounded-sm">
                    <span>
                      <LogOut className="text-[#acacac] w-4 h-4" />
                    </span>
                    <span className="text-sm">Logout</span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
