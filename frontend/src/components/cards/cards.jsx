import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const Cards = () => {
  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          UI/UX Review Check
        </Typography>
        <Typography>
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &quot;Naviglio&quot; where you can enjoy the main
          night life in Barcelona.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex gap-3">
        <Button className="flex items-center gap-2" color="red">
          <TrashIcon className="h-5 w-5" /> Delete
        </Button>

        <Button className="flex items-center gap-2" color="green">
          <PencilSquareIcon className="h-5 w-5" /> Edit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Cards;
