import { createContext } from 'react'

let LayoutContext

const { Provider } = (LayoutContext = createContext())

export { Provider as LayoutProvider, LayoutContext }
