# 🎯 Hướng dẫn học Radix UI từ A-Z

## 1. Giới thiệu Radix UI

Radix UI là một thư viện components React cung cấp các primitive components không có styling, tập trung vào:

- **Accessibility**: Tuân thủ WAI-ARIA guidelines
- **Composability**: Có thể kết hợp linh hoạt  
- **Customizable**: Hoàn toàn có thể tùy chỉnh styling
- **Headless**: Không có CSS mặc định

## 2. Cài đặt

```bash
# Cài đặt các packages cơ bản
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-tooltip

# Cài đặt thêm các packages khác
npm install @radix-ui/react-toast @radix-ui/react-accordion @radix-ui/react-tabs @radix-ui/react-switch @radix-ui/react-checkbox @radix-ui/react-radio-group @radix-ui/react-slider @radix-ui/react-progress @radix-ui/react-avatar @radix-ui/react-separator @radix-ui/react-label @radix-ui/react-slot

# Cài đặt class-variance-authority để quản lý variants
npm install class-variance-authority clsx tailwind-merge
```

## 3. Các khái niệm cơ bản

### 3.1 Primitives vs Components
- **Primitives**: Các building blocks cơ bản (Dialog.Root, Dialog.Trigger, Dialog.Content)
- **Components**: Các components hoàn chỉnh được build từ primitives

### 3.2 Composition Pattern
Radix UI sử dụng composition pattern, cho phép bạn kết hợp các parts:

```tsx
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Title>Title</Dialog.Title>
    <Dialog.Description>Description</Dialog.Description>
  </Dialog.Content>
</Dialog.Root>
```

### 3.3 Accessibility Features
- Focus management
- Keyboard navigation
- Screen reader support
- ARIA attributes tự động

## 4. Các Components phổ biến

### 4.1 Dialog (Modal)
```tsx
import * as Dialog from '@radix-ui/react-dialog'

<Dialog.Root>
  <Dialog.Trigger className="btn">Open Dialog</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
    <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg">
      <Dialog.Title>Dialog Title</Dialog.Title>
      <Dialog.Description>Dialog description</Dialog.Description>
      <Dialog.Close>Close</Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

### 4.2 Dropdown Menu
```tsx
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

<DropdownMenu.Root>
  <DropdownMenu.Trigger className="btn">Open Menu</DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content className="bg-white border rounded-md shadow-lg p-1">
      <DropdownMenu.Item className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
        Item 1
      </DropdownMenu.Item>
      <DropdownMenu.Item className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
        Item 2
      </DropdownMenu.Item>
      <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
      <DropdownMenu.Item className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
        Item 3
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
```

### 4.3 Tooltip
```tsx
import * as Tooltip from '@radix-ui/react-tooltip'

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <button className="btn">Hover me</button>
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content className="bg-black text-white px-2 py-1 rounded text-sm">
        Tooltip content
        <Tooltip.Arrow className="fill-black" />
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
```

## 5. Best Practices

### 5.1 Styling với Tailwind CSS
- Sử dụng Tailwind classes để style
- Tạo custom CSS variables cho themes
- Sử dụng `cn()` utility để merge classes

### 5.2 State Management
- Radix UI quản lý state internally
- Sử dụng `defaultOpen`, `open`, `onOpenChange` để control state
- Kết hợp với React state khi cần

### 5.3 Customization
- Override default behaviors với props
- Sử dụng `asChild` prop để render custom elements
- Tạo wrapper components cho reusability

## 6. Advanced Patterns

### 6.1 Compound Components
```tsx
const Card = ({ children, ...props }) => (
  <div className="bg-white rounded-lg shadow-md p-6" {...props}>
    {children}
  </div>
)

const CardHeader = ({ children, ...props }) => (
  <div className="mb-4" {...props}>
    {children}
  </div>
)

const CardTitle = ({ children, ...props }) => (
  <h3 className="text-lg font-semibold" {...props}>
    {children}
  </h3>
)

// Usage
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
</Card>
```

### 6.2 Variant System với CVA
```tsx
import { cva } from 'class-variance-authority'

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

## 7. Tích hợp vào dự án

### 7.1 Tạo UI Library
- Tạo folder `src/components/ui/`
- Tạo các wrapper components
- Export từ `src/components/ui/index.ts`

### 7.2 Theme System
- Sử dụng CSS variables
- Tạo dark/light mode support
- Consistent spacing và typography

### 7.3 Testing
- Test accessibility với jest-axe
- Test keyboard navigation
- Test screen reader compatibility

## 8. Resources

- [Radix UI Documentation](https://www.radix-ui.com/)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Accessibility Guidelines](https://www.w3.org/WAI/ARIA/apg/)
- [Tailwind CSS](https://tailwindcss.com/)

## 9. Next Steps

1. Cài đặt packages
2. Tạo các components cơ bản
3. Implement trong dự án thực tế
4. Tạo design system
5. Test accessibility
