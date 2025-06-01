export interface IFormData {
  id: string
  question: string
  answer: string
  query: IQueryData | null
}

export interface IQueryData {
  id: string
  title: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  status: string
  formDataID: string
}

export interface ICountedFormData {
  total: number
  formData: IFormData[]
}
