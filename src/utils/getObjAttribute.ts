export default function getObjAttribute<Output>(obj: Record<string, any> | undefined, key: string) {
  const keys = key.split('.');
  
  return keys.reduce((attribute, key) => {
    return attribute?.[key];
  }, obj) as Output | undefined;
}
