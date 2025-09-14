import { Input, InputField, InputIcon, InputSlot } from '@libs/ui';
import { LucideIcon } from 'lucide-react-native';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';

interface CustomInputProps<T extends FieldValues> {
  label: string;
  placeholder: string;
  name: FieldPath<T>;
  control: Control<T>;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  onRightIconPress?: () => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  disabled?: boolean;
  className?: string;
  rules?: any;
}

const CustomInput = <T extends FieldValues>({
  label,
  placeholder,
  name,
  control,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onRightIconPress,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  disabled = false,
  className = '',
  rules,
}: CustomInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className={`w-full ${className}`}>
          {/* Label */}
          <Text className="text-sm font-medium text-gray-700 mb-2">
            {label}
          </Text>
          
          {/* Input Container */}
          <View className="relative">
            <Input 
              variant="outline" 
              size="xl" 
              className={`w-full border-gray-200 rounded-2xl bg-white shadow-sm transition-all duration-200 ${
                error ? 'border-red-300 shadow-red-100' : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
              } ${disabled ? 'opacity-50' : ''}`}
              style={{ minHeight: 64 }}
            >
              {/* Left Icon */}
              {LeftIcon && (
                <InputSlot className="pl-5" style={{ paddingTop: 18, paddingBottom: 18 }}>
                  <InputIcon>
                    <LeftIcon size={20} color={error ? '#EF4444' : '#6B7280'} />
                  </InputIcon>
                </InputSlot>
              )}
              
              {/* Input Field */}
              <InputField
                placeholder={placeholder}
                value={value || ''}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                editable={!disabled}
                autoComplete="off"
                textContentType="none"
                passwordRules=""
                autoCorrect={false}
                returnKeyType="next"
                blurOnSubmit={false}
                focusable={!disabled}
                importantForAutofill="no"
                className={`text-base ${
                  LeftIcon ? 'pl-3' : 'pl-5'
                } ${RightIcon ? 'pr-3' : 'pr-5'}`}
                placeholderTextColor="#9CA3AF"
                style={{
                  height: 56,
                  paddingTop: 18,
                  paddingBottom: 18,
                  lineHeight: 20,
                  textAlignVertical: 'top',
                  color: '#111827',
                  fontSize: 16,
                }}
              />
              
              {/* Right Icon */}
              {RightIcon && (
                <InputSlot className="pr-5" style={{ paddingTop: 18, paddingBottom: 18 }}>
                  <Pressable 
                    onPress={onRightIconPress}
                    disabled={disabled}
                    className="p-2 rounded-full active:bg-gray-100"
                  >
                    <InputIcon>
                      <RightIcon 
                        size={20} 
                        color={error ? '#EF4444' : '#6B7280'} 
                      />
                    </InputIcon>
                  </Pressable>
                </InputSlot>
              )}
            </Input>
            
            {/* Error Message */}
            {error && (
              <Text className="text-xs text-red-500 mt-2 ml-2 font-medium">
                {error.message}
              </Text>
            )}
          </View>
        </View>
      )}
    />
  );
};

export default CustomInput;
