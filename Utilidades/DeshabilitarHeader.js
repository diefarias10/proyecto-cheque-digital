import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

function deshabilitarHeader(route, screensToDisable) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

const disable = screensToDisable.some(screen =>  screen === routeName)

return !disable
}

export default deshabilitarHeader;