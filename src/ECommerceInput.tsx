import React from 'react'
import styled, { css } from 'styled-components'
import * as icons from './icons'
import { default as BaseMaskedInput } from 'react-text-mask'

import { color, font } from './theme'

export const dateMask: Array<RegExp | string> = [
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]

const i18n = {
  t: (value: string) => value,
}

const Description = styled.div`
  font-family: ${font.regular};
  color: ${color.textVariant9};
  font-size: 15px;
  text-align: center;
  padding: 0 16px;
  margin-bottom: 12px;
`

const ECommerceInputContainer = styled.div`
  --disabled-opacity: 0.8;

  position: relative;

  label {
    color: ${color.textVariant9};
    font-size: 1rem;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 12px;
    transition: 0.2s ease all;
  }

  input[disabled] ~ label {
    opacity: var(--disabled-opacity);
  }

  input:disabled:not([value='']) ~ label,
  input:focus ~ label,
  input:not(:focus):not(:placeholder-shown) ~ label {
    color: ${color.textVariant11};
    top: 4px;
    transform: translateY(0);
  }
`

const Input = styled.input<{
  error: React.ReactNode
  hasLabel: boolean
  isPassword: boolean
}>`
  width: 100%;
  height: 50px;
  border-radius: 2px;
  border-style: solid;
  border-width: 1px;
  font-size: 1rem;
  border-color: ${({ error }) => (error ? color.error2 : color.surface2)};
  background-color: ${color.surface2};
  color: ${color.textVariant11};

  ${($) =>
    $.hasLabel
      ? css`
          padding: 18px 0 0 11px;
        `
      : css`
          padding: 0 0 0 11px;
        `}

  ${($) => $.isPassword && `padding-right: 75px;`}

  &[disabled] {
    cursor: not-allowed;
    opacity: var(--disabled-opacity);
  }

  :-webkit-autofill,
  :-internal-autofill-selected {
    box-shadow: 0 0 0px 1000px ${color.surface2} inset;
    -webkit-text-fill-color: ${color.textVariant11};
  }
`

const VisibilityToggleButton = styled.button`
  cursor: pointer;
  border: 0;
  background: 0;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);

  color: ${color.textVariant9};

  svg path {
    fill: ${color.textVariant9};
  }
`

export const ErrorStyle = styled.div`
  margin: 6px 3px 0 0;
  font-family: ${font.regular};
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: normal;
  color: ${color.error2};
`

type ECommerceInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  description?: React.ReactNode
  htmlFor?: string
  error?: React.ReactNode
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
}

export const ECommerceInput = React.forwardRef<
  HTMLInputElement,
  ECommerceInputProps
>(function ECommerceInput(
  props: ECommerceInputProps,
  ref: React.Ref<HTMLInputElement>,
): JSX.Element {
  const {
    id,
    type,
    labelProps,
    error,
    htmlFor,
    placeholder = ' ',
    description,
    className,
    style,
    ...rest
  } = props

  const [passwordVisible, setPasswordVisible] = React.useState(false)

  const computedType =
    type === 'password' ? (passwordVisible ? 'text' : 'password') : type

  const descriptionId = `_${id}-description`
  const errormessageId = `_${id}-errormessage`
  return (
    <div className={className} style={style}>
      {description && (
        <Description id={descriptionId}>{description}</Description>
      )}

      <ECommerceInputContainer>
        <Input
          {...rest}
          ref={ref}
          id={id}
          type={computedType}
          error={error}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-errormessage={errormessageId}
          hasLabel={Boolean(labelProps)}
          isPassword={type === 'password'}
        />
        {labelProps && <label {...labelProps} />}
        {type === 'password' && (
          <VisibilityToggleButton
            onClick={() => setPasswordVisible((prev) => !prev)}
          >
            <icons.EyeOpen />{' '}
            {passwordVisible ? i18n.t('Hide') : i18n.t('Show')}
          </VisibilityToggleButton>
        )}
      </ECommerceInputContainer>
      {error && <ErrorStyle id={errormessageId}>{error}</ErrorStyle>}
    </div>
  )
})

type ECommerceMaskedInputProps = {
  mask: Array<string | RegExp>
} & ECommerceInputProps

export const ECommerceMaskedInput: React.FC<ECommerceMaskedInputProps> = ({
  mask,
  ...otherProps
}) => {
  return (
    <BaseMaskedInput
      mask={mask}
      {...otherProps}
      render={(ref, maskedInputProps) => {
        return <ECommerceInput ref={ref} {...maskedInputProps} />
      }}
    />
  )
}

export const ECommerceDateInput: React.FC<ECommerceInputProps> = (props) => {
  return <ECommerceMaskedInput mask={dateMask} {...props} />
}

const RoundedInputStyle = css`
  label,
  input:disabled:not([value='']) ~ label,
  input:focus ~ label,
  input:not(:focus):not(:placeholder-shown) ~ label {
    color: ${color.textVariant12};
  }

  input {
    background-color: ${color.background3};
    border-color: ${color.lightBorder};
    border-radius: 7px;
    color: ${color.textVariant12};
  }
`

export const RoundedEcommerceInput = styled(ECommerceInput)`
  ${RoundedInputStyle}
`

export const RoundedEcommerceDateInput = styled(ECommerceDateInput)`
  ${RoundedInputStyle}
`
