import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartType = {
  label: string,
  name: string,
  color: string,
  price: number,
  category: string,
  total: number,
  litre: string,
  qty: number
}

export const round2 = (num: number) => Math.round((num+ Number.EPSILON) * 10) /100

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
      const exist = items.find((x) => x.name === item.name)
      const updatedCartItems = exist ?
        items.map((x) => x.name === item.name ?
          { ...exist, }
          : x)
        : [...items, { ...item, qty: 1, ...(item.category === 'fuel' && { litre: '10' }), total: item.category === 'fuel' ? item.price * 10 : item.price }]
        
        const subtotal = updatedCartItems.reduce((a, c) => a + c.total, 0)


      cartStore.setState({
        valueLitre: exist ? exist.litre : '10',
        items: updatedCartItems,
        subtotal,
        total: subtotal - discount
      })
    },
    handleSelected: (name: string) => {
      cartStore.setState({
        selected: name === selected ? '' : name,
      })
    },
    handleChangeLitre: (value: number ) => {
      const exist = items.find((x) => x.name === selected)
      const updatedCartItems = exist ? items.map((x: any) => x.name === selected ?
        { ...exist, litre: value, total: value * exist.qty * exist.price }
        : x) : [...items]

      const subtotal = updatedCartItems.reduce((a, c) => {
        if (isNaN(c.total))
          return c.total
        return a + Number(c.total)
      }, 0)

      cartStore.setState({
        items: updatedCartItems,
        valueLitre: value,
        subtotal,
        total: subtotal - discount
      })
    },
    handleQty: (value: string) => {
      const exist = items.find((x: any) => x.name === selected)
      const updatedCartItems = exist && items.map((x: any) => x.name === selected ?
        { ...exist, qty: value, total: (value * exist.litre) * exist.price }
        : x)

      const subtotal = updatedCartItems!.reduce((a, c) => {
        if (isNaN(c.total))
          return c.total
        return a + Number(c.total)
      }, 0)

      cartStore.setState({
        items: updatedCartItems,
        subtotal,
        total: subtotal - discount
      })
    },
    increase: (item: CartType) => () => {
      const exist = items.find((x: any) => x.name === selected)
      const updatedCartItems = 
        items.map((x: any) => x.name === item.name ?
          { ...exist, qty: exist!.qty + 1, total: (exist!.qty + 1) * item.price }
          : x)

          const subtotal = updatedCartItems.reduce((a, c) => {
            if (isNaN(c.total))
              return c.total
            return a + Number(c.total)
          }, 0)

          const total = items.reduce((a, c) => {
            if (isNaN(c.total))
              return c.total
            return a + Number(c.total)
          }, 0)

      cartStore.setState({
        items: updatedCartItems,
        subtotal,
        total: subtotal - discount,
      })
    },
    decrease: (item: CartType) => () => {
      const exist = items.find((x: any) => x.name === selected)
      const updatedCartItems = exist!.qty === 1
      ? items.filter(x => x.name !== item.name)
      : items.map((x: any) => x.name === item.name ?
          { ...exist, qty: exist!.qty - 1, total: (exist!.qty - 1) * item.price }
          : x)

          const subtotal = updatedCartItems.reduce((a, c) => {
            if (isNaN(c.total))
              return c.total
            return a + Number(c.total)
          }, 0)

      cartStore.setState({
        items: updatedCartItems,
        subtotal,
        total: subtotal - discount,
        selected: exist!.qty === 1 ? '' : selected
      })
    },
    handleDelete: (value: string) => {
      const updatedCartItems = items.filter(item => item.name !== value)
      const subtotal = updatedCartItems.reduce((a, c) => {
        if (isNaN(c.total)) return c.total
        return a + Number(c.total)
      }, 0)

      cartStore.setState({
        items: updatedCartItems,
        subtotal,
        total: subtotal - discount,
        selected: '',
      })
    },

  }
}
