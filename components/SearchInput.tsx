import { Search } from "lucide-react";
import { Input } from "./ui/Input";

export const SearchInput = () => (
  <Input icon={<Search />} placeholder="Search for clips, users or categories" />
);
