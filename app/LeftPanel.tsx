import { UserMinimizedCard } from "@/components/UserMinimizedCard";

export const LeftPanel = () => (
  <div className="w-full flex flex-col flex-1 overflow-y-auto">
    <h4 className="text-primary-100">People</h4>
    <h6 className="text-primary-300 mt-3 text-sm font-bold uppercase">
      ONLINE (50)
    </h6>
    <div className="flex flex-col mt-3 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-700 overflow-x-hidden scrollbar-hide">
      {Array(50)
        .fill(0)
        .map((c, key) => (
          <UserMinimizedCard
            key={key}
            avatar="https://avatars.githubusercontent.com/u/63454940?s=96&v=4"
            fullname="Aziz Becha"
            username="azizbecha"
            verified
          />
        ))}
    </div>
  </div>
);
