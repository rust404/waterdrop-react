export const getCategoryById = (categories: ICategoryItem[], id: number) => {
  return categories.filter(category => category.id === id)[0]
}
