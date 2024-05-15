import React, { useEffect, useRef, useState } from "react";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { updateComment } from "@/services/GameService";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UserStats } from "./UserStats";
import { Link } from "react-router-dom";

enum GameResultFilter {
  ALL = "ALL",
  WON = "WON",
  LOST = "LOST",
  DRAW = "DRAW",
}

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [elo, setElo] = useState(-1);
  const [gamesPlayed, setGamesPlayed] = useState({});
  const inputCommentRef = useRef(null);

  const [resultFilter, setResultFilter] = useState<GameResultFilter>(
    GameResultFilter.ALL
  );

  const { whoAmI } = useWhoAmIContext();

  const columns: ColumnDef<GameHistoryRow>[] = [
    {
      accessorKey: "id",
      header: "GameID",
      cell: ({ row }) => (
        <Button variant="link">
          <Link to={`/replay/${row.original.gameid}`}>
            {row.original.gameid}
          </Link>
        </Button>
      ),
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
      cell: ({ row }) => (
        <div className="max-w-fit overflow-hidden">{row.getValue("comments") && `${row
          .getValue("comments")
          .substring(0, 60)}${
          row.getValue("comments").length > 50 && "..."
        }`}</div>
      ),
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
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
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
                <DropdownMenuItem>
                  <DialogTrigger>View comments</DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>View and edit comment</DialogTitle>
                <DialogDescription>
                  Add any comments you'd like. Click save when you're done.
                </DialogDescription>
              </DialogHeader>

              <Textarea
                ref={inputCommentRef}
                id="inputComment"
                defaultValue={game.comments}
                placeholder="Enter comments..."
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    onClick={() => {
                      const inputValue = inputCommentRef?.current.value;
                      saveComment(game.gameid, inputValue);
                      game.comments = inputValue;
                    }}
                  >
                    Save
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
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

  const saveComment = (gameID, comment) => {
    updateComment(gameID, comment);
  };

  useEffect(() => {
    setUsername(whoAmI?.username ?? "Guest");
    setEmail(whoAmI?.email ?? "GuestEmail");
    setElo(whoAmI?.elo ?? -1);

    getGameHistorySummary().then((data) => setGamesPlayed(data ?? []));
  }, [whoAmI?.email, whoAmI?.username]);

  return (
    <main className="min-h-screen auto overflow-auto p-2">
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
            <h3>Elo: {elo}</h3>
            {/* <h2>Last Name: {user.lastName}</h2> */}
          </div>
        </div>
      </div>
      <div className="p-4 bg-blue-100 rounded-md">
        <h3 className="italic">User Details</h3>
        <Accordion type="multiple" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="max-w-44">
              Game History
            </AccordionTrigger>
            <AccordionContent>
              <GameHistorySummary data={getGamesPlayed()} columns={columns} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="max-w-44">Statistics</AccordionTrigger>
            <AccordionContent>
              <UserStats data={gamesPlayed} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
};

export default Profile;
