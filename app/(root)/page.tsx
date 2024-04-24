import Image from "@/node_modules/next/image";
import { Input } from "@/components/ui/input";
import { dataCard } from "@/constants/data"
import CardListGas from '@/components/CardListGas';

export default function Home() {
  return <CardListGas data={dataCard} />
}
