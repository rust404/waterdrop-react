export const getCategoryById = (categories: CategoryItem[], id: number) => {
  return categories.filter(category => category.id === id)[0]
}
