export interface IStatus {
  valid: boolean
  message?: string
}

type Rule = (value: string) => IStatus

export const required: Rule = (value: string): IStatus => {
  const result = Boolean(value)

  return {
    valid: result,
    message: result ? '' : 'This field is required',
  }
}

export const length = ({
  min, max 
}: { min: number; max: number }): Rule => {
  return (value: string): IStatus => {
    const result = Boolean(value.length >= min && value.length <= max)

    return {
      valid: result,
      message: result
        ? ''
        : `This field must be between ${ min } and ${ max } characters`,
    }
  }
}

export const validate = (value: string, rules: Rule[]): IStatus => {
  for (const rule of rules) {
    const result = rule(value)

    if (!result.valid) {
      return result
    }
  }

  return {
    valid: true,
  }
}