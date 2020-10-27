export const getCategoryById = (categories: CategoryItem[], id: string) => {
  return categories.filter(category => category.id === id)[0]
}
