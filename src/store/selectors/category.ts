export const getCategoryById = (categories: Category[], id: string) => {
  return categories.filter(category => category.id === id)[0]
}
