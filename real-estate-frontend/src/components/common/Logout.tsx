import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import { LogOut } from "lucide-react";

export const Logout = () => {
  const navigate = useNavigate(); // <-- get navigate function

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant={"outline"}>
          Logout <LogOut />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Logging Out?</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out?
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 justify-end">
          <Button className="">
            <DialogClose className="cursor-pointer">Cancel</DialogClose>
          </Button>
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="cursor-pointer border border-red-500"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
