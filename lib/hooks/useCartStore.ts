import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Cart = {
  items: any
}

const initialState: Cart = {
  items: [],
}

export const cartStore = create<Cart>()(
  persist(() => initialState, {
    name: 'cartStore'
  })
)
// export const cartStore = create<Cart>(() => initialState)

export default function useCartService() {
  const { items } = cartStore()
  return {
    items,
    addToCart: (item: any) => {
      // const exist = items.find((x: OrderItem) => x.slug === item.slug)
      const updatedCartItems = [...items, { ...item, qty: 1 }]
      cartStore.setState({
        items: updatedCartItems,
      })
    }
  }
}

