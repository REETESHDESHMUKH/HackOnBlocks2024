import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/react'
import React, { useState } from 'react'

function classNames(...classes: string[]) {
return classes.filter(Boolean).join(' ')
}

function Toggle({enabled,onEnableChange}: any) {

  return (
    <Switch.Group as="div" className="flex items-center mt-7">
      <Switch
        checked={enabled}
        onChange={onEnableChange}
        className={classNames(
          enabled ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3">
        <span className="text-sm font-medium text-gray-900">Enable record saving </span>
        <span className="text-sm text-gray-500">(prove anyone)</span>
      </Switch.Label>
    </Switch.Group>
  )
}

export default Toggle