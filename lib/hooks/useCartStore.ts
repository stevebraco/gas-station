import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartType = {
  label: string,
  name: string,
  color: string,
  price: number,
  category: string,
  total?: number,
  litre?: string,
  qty?: number
}

export type Cart = {
  items: CartType[]
  valueLitre: string
  selected: string
  subtotal: number
  quantity: number
  total: number
  discount: number
}

const initialState: Cart = {
  items: [],
  valueLitre: '10',
  selected: '',
  subtotal: 0,
  quantity: 1,
  total: 0,
  discount: 0
}

export const cartStore = create<Cart>()(
  persist(() => initialState, {
    name: 'cartStore'
  })
)
// export const cartStore = create<Cart>(() => initialState)


export default function useCartService() {
  const { items, valueLitre, selected, subtotal, quantity, total, discount } = cartStore()
  return {
    items,
    valueLitre,
    selected,
    subtotal,
    quantity,
    total,
    discount,
    addToCart: (item: CartType) => {
      const exist = items.find((x: CartType) => x.name === item.name)
      const updatedCartItems = exist ?
        items.map((x: CartType) => x.name === item.name ?
          { ...exist, }
          : x)
        : [...items, { ...item, qty: 1, ...(item.category === 'fuel' && { litre: '10' }), total: item.category === 'fuel' ? item.price * 10 : item.price }]

      const { subtotal, total } = calcPrice({ items: updatedCartItems, discount })


      cartStore.setState({
        valueLitre: exist ? exist.litre : '10',
        items: updatedCartItems,
        subtotal,
        total
      })
    },
    handleSelected: (name: string) => {
      cartStore.setState({
        selected: name === selected ? '' : name,
      })
    },
    handleChangeLitre: (value: number) => {
      const exist = items.find((x: CartType) => x.name === selected)
      const updatedCartItems = exist ? items.map((x: any) => x.name === selected ?
        { ...exist, litre: value, total: value * exist.qty * exist.price }
        : x) : [...items]

      const { subtotal, total } = calcPrice({ items: updatedCartItems, discount })

      cartStore.setState({
        items: updatedCartItems,
        valueLitre: value,
        subtotal,
        total
      })
    },
    handleQty: (value: number) => {
      const exist = items.find((x: CartType) => x.name === selected)
      const updatedCartItems = exist && items.map((x: any) => x.name === selected ?
        { ...exist, qty: value, total: value * exist.litre * exist.price }
        : x)

      const { subtotal, total } = calcPrice({ items: updatedCartItems, discount })

      cartStore.setState({
        items: updatedCartItems,
        subtotal,
        total
      })
    },
    increase: (item: CartType) => () => {
      const exist = items.find((x: CartType) => x.name === selected)
      const updatedCartItems =
        items.map((x: any) => x.name === item.name ?
          { ...exist, qty: exist!.qty + 1, total: (exist!.qty + 1) * item.price }
          : x)

      const { subtotal, total } = calcPrice({ items: updatedCartItems, discount })


      cartStore.setState({
        items: updatedCartItems,
        subtotal,
        total,
      })
    },
    decrease: (item: CartType) => () => {
      const exist = items.find((x: any) => x.name === selected)
      const updatedCartItems = exist!.qty === 1
        ? items.filter((x: CartType) => x.name !== item.name)
        : items.map((x: CartType) => x.name === item.name ?
          { ...exist, qty: exist!.qty - 1, total: (exist!.qty - 1) * item.price }
          : x)

      const { subtotal, total } = calcPrice({ items: updatedCartItems, discount })


      cartStore.setState({
        items: updatedCartItems,
        subtotal,
        total,
        selected: exist!.qty === 1 ? '' : selected
      })
    },
    handleDelete: (value: string) => {
      const updatedCartItems = items.filter((item: CartType) => item.name !== value)
      const { subtotal, total } = calcPrice({ items: updatedCartItems, discount })


      cartStore.setState({
        items: updatedCartItems,
        subtotal,
        total,
        selected: '',
      })
    },

  }
}

const calcPrice = ({ items, discount }: { items: CartType[], discount: number }) => {
  const subtotal = items.reduce((a, c) => a + c.total, 0)
  const total = subtotal - discount
  return {
    subtotal,
    total
  }
}
