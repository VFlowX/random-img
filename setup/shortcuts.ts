import type { NavOperations, ShortcutOptions } from '@slidev/types'
import { defineShortcutsSetup } from '@slidev/types'

export default defineShortcutsSetup((nav: NavOperations, base: ShortcutOptions[]) => {
  return [
    // ...base, // keep the existing shortcuts
    {
      name: 'goto',
      key: 'ArrowRight',
      fn: () => nav.go(0),
      autoRepeat: true,
    },
  ]
})