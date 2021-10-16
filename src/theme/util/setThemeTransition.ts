export default function setThemeTransition(propertyList: string[]) {
  return {
    transition: '300ms ease-in-out',
    transitionProperty: `${propertyList}`,
  }
}
