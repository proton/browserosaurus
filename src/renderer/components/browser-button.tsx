import cc from 'classcat'
import React, { useCallback } from 'react'

import { Browser } from '../../config/browsers'
import { selectBrowser } from '../sendToMain'

/**
 * Determines Tailwind text class given a browser name of given length.
 * @param name browser name
 */
const getNameSize = (name: string): string => {
  const numberWords = name.split(' ').length

  if (numberWords >= 3) {
    return 'text-xs'
  }

  if (numberWords === 2) {
    return 'text-sm'
  }

  if (name.length > 10) {
    return 'text-sm'
  }

  if (name.length > 7) {
    return 'text-base'
  }

  return 'text-lg'
}

interface Props {
  browser: Browser
  className?: string
}

const BrowserButton: React.FC<Props> = ({ browser, className }) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      selectBrowser(browser.id, event.altKey)
    },
    [browser.id],
  )

  const nameSizeClass = getNameSize(browser.name)

  return (
    <button
      key={browser.id}
      className={cc([
        'bg-grey-700 p-4 flex flex-col justify-between items-stretch text-left rounded focus:outline-none',
        'text-grey-500',
        'hover:text-grey-200',
        className,
      ])}
      onClick={handleClick}
      type="button"
    >
      <div className="flex justify-between items-center mb-4">
        <img alt={browser.name} className="w-8 h-8" src={browser.logo} />
        {browser.hotKey && (
          <kbd className="bg-grey-800 px-2 text-xs font-bold uppercase rounded">
            {browser.hotKey}
          </kbd>
        )}
      </div>
      <div className={cc(['font-bold', nameSizeClass])}>{browser.name}</div>
    </button>
  )
}

export default BrowserButton
