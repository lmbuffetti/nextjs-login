import {
  ArrowLeftStartOnRectangleIcon,
  BookOpenIcon,
  HomeIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid'

export const sidebarNavigation = [
  {
    label: 'Dashboard',
    icon: <HomeIcon className="w-6" />,
    href: `/`,
  },
]

export const sidebarNavigationGuest = [
  {
    label: 'Sign In',
    icon: <ArrowLeftStartOnRectangleIcon className="w-6" />,
    href: `/login`,
  },
  {
    label: 'Sign up',
    icon: <PencilSquareIcon className="w-6" />,
    href: '/register',
  },
]

export const sidebarNavigationLoggedIn = [
  {
    label: 'API Docs',
    icon: <BookOpenIcon className="w-6" />,
    href: `/api-doc`,
  },
  {
    label: 'Sign Out',
    icon: <ArrowLeftStartOnRectangleIcon className="w-6" />,
    href: '/login',
  },
]
