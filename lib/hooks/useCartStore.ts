import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Cart = {
  items: any
  valueLitre: string
  selected: string
  subtotal: number
}

const initialState: Cart = {
  items: [],
  valueLitre: '10',
  selected: '',
  subtotal: 0
}

export const cartStore = create<Cart>()(
  persist(() => initialState, {
    name: 'cartStore'
  })
)
// export const cartStore = create<Cart>(() => initialState)

export default function useCartService() {
  const { items, valueLitre, selected, subtotal } = cartStore()
  return {
    items,
    valueLitre,
    selected,
    subtotal,
    addToCart: (item: any) => {
      const exist = items.find((x: any) => x.name === item.name)
      const updatedCartItems = exist ?
        items.map((x: any) => x.name === item.name ?
          { ...exist, }
          : x)
        : [...items, { ...item, qty: 1, litre: '10', total: parseFloat(Number(item.price) * 10).toFixed(2) }]

      const subtotal = updatedCartItems.reduce((a, c) => {
        if (isNaN(c.total))
          return c.total
        return a + Number(c.total)
      }, 0)

      cartStore.setState({
        valueLitre: exist ? exist.litre : '10',
        items: updatedCartItems,
        subtotal
      })
    },
    handleSelected: (title: string) => {
      cartStore.setState({
        selected: title === selected ? '' : title,
      })
    },
    handleChangeLitre: (value: any) => {
      const exist = items.find((x: any) => x.title === selected)
      const updatedCartItems = exist && items.map((x: any) => x.title === selected ?
        { ...exist, litre: value, total: parseFloat((value * exist.qty) * exist.price).toFixed(2) }
        : x)

      const subtotal = updatedCartItems.reduce((a, c) => {
        if (isNaN(c.total))
          return c.total
        return a + Number(c.total)
      }, 0)

      cartStore.setState({
        items: updatedCartItems,
        valueLitre: value,
        subtotal
      })
    },
    handleQty: (value: string) => {
      const exist = items.find((x: any) => x.title === selected)
      const updatedCartItems = exist && items.map((x: any) => x.title === selected ?
        { ...exist, qty: value, total: parseFloat((value * exist.litre) * exist.price).toFixed(2) }
        : x)

      const subtotal = updatedCartItems.reduce((a, c) => {
        if (isNaN(c.total))
          return c.total
        return a + Number(c.total)
      }, 0)

      cartStore.setState({
        items: updatedCartItems,
        subtotal
      })
    },
    handleDelete: (value: string) => {
      const updatedCartItems = items.filter(item => item.title !== value)

      const subtotal = updatedCartItems.reduce((a, c) => {
        if (isNaN(c.total))
          return c.total
        return a + Number(c.total)
      }, 0)

      cartStore.setState({
        items: updatedCartItems,
        subtotal
      })
    }
  }
}

