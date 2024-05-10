import React, { useEffect, useState } from "react";
import { useWhoAmIContext } from "../context/WhoAmIContext";
import { getGameHistorySummary } from "@/services/UserService";
import UserAvatar from "@/components/avatar/UserAvatar";
import { GameHistorySummary } from "@/components/gameHistory/GameHistorySummary";
import { ColumnDef } from "@tanstack/react-table";
import { GameHistoryRow } from "@/data/models/TableTypes";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import clsx from "clsx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

enum GameResultFilter {
  ALL = "ALL",
  WON = "WON",
  LOST = "LOST",
  DRAW = "DRAW",
}

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gamesPlayed, setGamesPlayed] = useState({});

  const [resultFilter, setResultFilter] = useState<GameResultFilter>(
    GameResultFilter.ALL
  );

  const { whoAmI } = useWhoAmIContext();

  const columns: ColumnDef<GameHistoryRow>[] = [
    {
      accessorKey: "id",
      header: "GameID",
      cell: ({ row }) => <div>{row.original.gameid}</div>,
    },
    {
      accessorKey: "result",
      header: ({ column }) => {
        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  Result ({resultFilter})
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Object.values(GameResultFilter).map((result) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={resultFilter === result}
                      onCheckedChange={() => setResultFilter(result)}
                    >
                      {result}
                    </DropdownMenuCheckboxItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      cell: ({ row }) => {
        const val = row.getValue("result").toUpperCase();
        let color = "text-black";
        switch (val) {
          case "WON":
            color = "text-green-600";
            break;

          case "LOST":
            color = "text-red-400";
            break;
        }
        return <div className={clsx("font-medium ", color)}>{val}</div>;
      },
    },
    {
      accessorKey: "turns",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Turns
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("turns")}</div>
      ),
    },
    {
      accessorKey: "players",
      header: "Players",
      cell: ({ row }) => {
        return row.original.playernames.map((el) => <div>{el}</div>);
      },
    },
    {
      accessorKey: "type",
      header: "Mode",
      cell: ({ row }) => {
        return row.original.game_type;
      },
    },
    {
      accessorKey: "comments",
      header: "Comments",
      cell: ({ row }) => <div className="max-w-fit overflow-hidden">{row.getValue("comments")}</div>
    },
    {
      accessorKey: "timestamp",
      header: ({ column }) => (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date Played (UTC)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        return <div className="text-right">{row.getValue("timestamp")}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const game = row.original;
   
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  alert("To be implemented");
                  console.log("Clicked on", game);
                }}
              >
                Replay game
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View comments</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ];

  const getGamesPlayed = () => {
    switch (resultFilter) {
      case GameResultFilter.ALL:
        return Object.values(gamesPlayed).reduce((acc, curr) => {
          return acc.concat(curr);
        }, []);
      
      case GameResultFilter.WON:
        return gamesPlayed.won;

      case GameResultFilter.LOST:
        return gamesPlayed.lost;

      case GameResultFilter.DRAW:
        return gamesPlayed.draw;
    }
  };

  useEffect(() => {
    setUsername(whoAmI?.username ?? "Guest");
    setEmail(whoAmI?.email ?? "GuestEmail");

    getGameHistorySummary().then((data) => setGamesPlayed(data ?? []));
  }, [whoAmI?.email, whoAmI?.username]);

  return (
    <main className="h-screen ">
      <div
        className="profile-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 className="text-3xl font-bold">User Profile</h1>
        </div>
        <div
          className="profile-info"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div className="h-24 w-24 mx-8">
            <UserAvatar />
          </div>
          <div>
            <h3>Username: {username}</h3>
            <h3>Email: {email}</h3>
            {/* <h2>Last Name: {user.lastName}</h2> */}
          </div>
        </div>
      </div>
      <div className="p-4">
        <GameHistorySummary data={getGamesPlayed()} columns={columns} />
      </div>
    </main>
  );
};

export default Profile;
