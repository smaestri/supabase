import { Button } from "@nextui-org/button";
import Link from "next/link";

export function UpdateBook({ id }: { id: number }) {
    return (
      <Link href={`/my-books/${id}/edit`}>
        <Button>Modifier</Button>
      </Link>
    );
  }