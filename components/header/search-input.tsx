"use client"
import { Input } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { useSearchParams } from "next/navigation";
import { search } from "@/lib/actions";

export default function SearchInput() {
    const searchParams = useSearchParams();
    return (<form action={search}>
        <Input
            name="term"
            classNames={{
                base: "max-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
            defaultValue={searchParams.get("term") || ""}
        /></form>)
}