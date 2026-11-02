import { useSyncExternalStore } from "react"

const subscribe = () => () => {}

/** False on the server and while the page hydrates, true once it runs in the browser.
 *  For decoration the browser can draw itself, so it stays out of the HTML. */
export const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
