import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, ChevronRight, ChevronLeft, Package, Truck, MessageSquare, 
  User, Home, Settings, Bell, Heart, Star, Send, Plus, X, Clock,
  MapPin, Calendar, FileText, Gift, ShoppingBag, Check, Info, AlertTriangle,
  ChevronDown, ChevronUp, Menu, Search, ExternalLink, ArrowRight, ArrowLeft,
  Eye, EyeOff, Lock, LogOut, Upload, Download, Edit, Trash, Save, 
  Phone, Mail, Share, Bookmark, Award, ShoppingCart, Map, Filter, Zap,
  MoreVertical, MoreHorizontal, DollarSign, Hash, Clipboard, ThumbsUp
} from 'lucide-react';

// Main component
const DesignSystemFinalPart = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('components');
  const [activeComponentsTab, setActiveComponentsTab] = useState('alerts');
  const [activePatternsTab, setActivePatternsTab] = useState('request');
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  // Styling for section headings
  const SectionTitle = ({ children, className = "" }) => (
    <h2 className={`text-2xl font-bold mb-6 ${className} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {children}
    </h2>
  );
  
  // Styling for subsection headings
  const SubsectionTitle = ({ children, className = "" }) => (
    <h3 className={`text-xl font-bold mb-4 ${className} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      {children}
    </h3>
  );
  
  // Styling for component labels
  const ComponentLabel = ({ children, className = "" }) => (
    <div className={`text-sm font-medium mb-2 ${className} ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      {children}
    </div>
  );
  
  // Card component  
  const Card = ({ 
    children, 
    variant = "default",
    padding = "default",
    className = "", 
    ...props 
  }) => {
    const variantClasses = {
      default: `${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`,
      gradient: `bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md`,
      outline: `bg-transparent border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`,
      flat: `${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`
    };
    
    const paddingClasses = {
      none: "",
      sm: "p-2",
      default: "p-4",
      lg: "p-6"
    };
    
    return (
      <div 
        className={`rounded-xl ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`} 
        {...props}
      >
        {children}
      </div>
    );
  };
  
  // Badge component
  const Badge = ({ 
    children, 
    variant = "default", 
    rounded = "full",
    className = "" 
  }) => {
    const variantClasses = {
      default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      primary: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      warning: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
      purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    };
    
    const roundedClasses = {
      full: "rounded-full",
      md: "rounded-md",
      lg: "rounded-lg"
    };
    
    return (
      <span className={`px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${roundedClasses[rounded]} ${className}`}>
        {children}
      </span>
    );
  };
  
  // Button component
  const Button = ({ 
    children, 
    variant = "primary", 
    size = "md", 
    iconStart,
    iconEnd,
    fullWidth = false,
    disabled = false,
    className = "",
    ...props 
  }) => {
    const variantClasses = {
      primary: `bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                text-white shadow-sm`,
      secondary: `bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 
                  dark:hover:bg-gray-600 dark:text-gray-200`,
      success: `bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 
                hover:to-green-700 text-white shadow-sm`,
      danger: `bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 
              hover:to-red-700 text-white shadow-sm`,
      warning: `bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 
                hover:to-amber-700 text-white shadow-sm`,
      outline: `bg-transparent border border-gray-300 dark:border-gray-600 
                text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800`,
      link: `bg-transparent text-blue-600 dark:text-blue-400 hover:underline p-0 shadow-none`
    };
    
    const sizeClasses = {
      sm: "px-3 py-1.5 text-xs rounded-lg",
      md: "px-4 py-2 text-sm rounded-lg",
      lg: "px-6 py-3 text-base rounded-lg",
      xl: "px-8 py-4 text-lg rounded-lg"
    };
    
    const disabledClasses = disabled ? 
      "opacity-50 cursor-not-allowed" : 
      "transform hover:scale-[1.02] active:scale-[0.98] transition duration-75";
    
    const widthClass = fullWidth ? "w-full" : "";
    
    return (
      <button 
        className={`font-medium flex items-center justify-center ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${widthClass} ${className}`}
        disabled={disabled}
        {...props}
      >
        {iconStart && <span className="ml-2 -mr-1">{iconStart}</span>}
        {children}
        {iconEnd && <span className="mr-2 -ml-1">{iconEnd}</span>}
      </button>
    );
  };
  
  // Alert component
  const Alert = ({
    children,
    title,
    variant = "info",
    icon,
    onClose,
    className = ""
  }) => {
    const variantClasses = {
      info: "bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 border-blue-200 dark:border-blue-800",
      success: "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200 border-green-200 dark:border-green-800",
      warning: "bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 border-amber-200 dark:border-amber-800",
      error: "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-200 border-red-200 dark:border-red-800"
    };
    
    const iconMap = {
      info: <Info size={20} />,
      success: <Check size={20} />,
      warning: <AlertTriangle size={20} />,
      error: <X size={20} />
    };
    
    const iconToShow = icon || iconMap[variant];
    
    return (
      <div className={`p-4 border-r-4 rounded-lg flex ${variantClasses[variant]} ${className}`} role="alert">
        {iconToShow && <div className="ml-3 flex-shrink-0">{iconToShow}</div>}
        <div className="mr-3 flex-1">
          {title && <div className="font-bold">{title}</div>}
          <div className={title ? "mt-1" : ""}>{children}</div>
        </div>
        {onClose && (
          <button
            type="button"
            className="mr-auto -my-1.5 -ml-1.5 flex-shrink-0 p-1.5 rounded-lg focus:ring-2 focus:ring-offset-2"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  };
  
  // Avatar component
  const Avatar = ({
    src,
    alt,
    size = "md",
    letter,
    status,
    className = ""
  }) => {
    const sizeClasses = {
      xs: "w-6 h-6 text-xs",
      sm: "w-8 h-8 text-sm",
      md: "w-10 h-10 text-base",
      lg: "w-12 h-12 text-lg",
      xl: "w-16 h-16 text-xl"
    };
    
    const statusClasses = {
      online: "bg-green-500",
      away: "bg-amber-500",
      offline: "bg-gray-400",
      busy: "bg-red-500"
    };
    
    return (
      <div className={`relative inline-flex ${className}`}>
        <div className={`flex items-center justify-center rounded-full overflow-hidden ${sizeClasses[size]} ${!src ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-bold' : ''}`}>
          {src ? (
            <img src={src} alt={alt || "Avatar"} className="w-full h-full object-cover" />
          ) : (
            <span>{letter}</span>
          )}
        </div>
        {status && (
          <span className={`absolute bottom-0 ${size === 'xs' ? 'left-0' : 'left-0.5'} block ${size === 'xs' || size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'} ${statusClasses[status]} rounded-full ring-2 ${darkMode ? 'ring-gray-800' : 'ring-white'}`}></span>
        )}
      </div>
    );
  };
  
  // Toggle component
  const Toggle = ({
    checked,
    onChange,
    label,
    disabled = false,
    size = "md",
    ...props
  }) => {
    const sizeClasses = {
      sm: "w-8 h-4",
      md: "w-10 h-5",
      lg: "w-12 h-6"
    };
    
    const toggleClasses = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5"
    };
    
    return (
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            {...props}
          />
          <div
            className={`block ${sizeClasses[size]} rounded-full ${
              disabled
                ? 'bg-gray-300 dark:bg-gray-700 opacity-50'
                : checked
                ? 'bg-blue-500'
                : 'bg-gray-300 dark:bg-gray-700'
            } transition-colors duration-200`}
          ></div>
          <div
            className={`absolute top-0.5 left-0.5 ${toggleClasses[size]} rounded-full bg-white transform transition-transform duration-200 ${
              checked ? `translate-x-${size === 'sm' ? '4' : size === 'md' ? '5' : '6'}` : 'translate-x-0'
            } ${disabled ? 'opacity-90' : ''}`}
          ></div>
        </div>
        {label && (
          <span className={`mr-3 ${disabled ? 'opacity-50' : ''} ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {label}
          </span>
        )}
      </label>
    );
  };

  // Tooltip component
  const Tooltip = ({ children, text, position = "top" }) => {
    const [isVisible, setIsVisible] = useState(false);
    
    const positionClasses = {
      top: "bottom-full left-1/2 -translate-x-1/2 -translate-y-2 mb-1",
      bottom: "top-full left-1/2 -translate-x-1/2 translate-y-2 mt-1",
      left: "right-full top-1/2 -translate-x-2 -translate-y-1/2 mr-1",
      right: "left-full top-1/2 translate-x-2 -translate-y-1/2 ml-1"
    };
    
    const arrowClasses = {
      top: "bottom-0 left-1/2 translate-y-full -translate-x-1/2 border-t-gray-800 border-r-transparent border-b-transparent border-l-transparent",
      bottom: "top-0 left-1/2 -translate-y-full -translate-x-1/2 border-b-gray-800 border-r-transparent border-t-transparent border-l-transparent",
      left: "right-0 top-1/2 translate-x-full -translate-y-1/2 border-l-gray-800 border-t-transparent border-r-transparent border-b-transparent",
      right: "left-0 top-1/2 -translate-x-full -translate-y-1/2 border-r-gray-800 border-t-transparent border-l-transparent border-b-transparent"
    };
    
    return (
      <div
        className="relative inline-block"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <div className="inline-block">{children}</div>
        {isVisible && (
          <div
            className={`absolute z-10 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded shadow-sm whitespace-nowrap ${positionClasses[position]}`}
            role="tooltip"
          >
            {text}
            <div className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`}></div>
          </div>
        )}
      </div>
    );
  };
  
  // Wave divider component
  const WaveDivider = ({ className = "", darkMode = false }) => (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg viewBox="0 0 1200 120" className="w-full h-6">
        <path 
          d="M0,24L60,30C120,36,240,48,360,48C480,48,600,36,720,36C840,36,960,48,1080,48C1200,48,1320,36,1380,30L1440,24L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" 
          fill={darkMode ? "#1E3A8A" : "#DBEAFE"}
        ></path>
      </svg>
    </div>
  );
  
  // Render Components Section
  const renderComponents = () => {
    const componentTabs = [
      { id: 'alerts', label: 'التنبيهات' },
      { id: 'badges', label: 'الشارات' },
      { id: 'avatars', label: 'الصور الشخصية' },
      { id: 'navigation', label: 'عناصر التنقل' },
      { id: 'feedback', label: 'التغذية الراجعة' }
    ];
    
    return (
      <div>
        <SectionTitle>مكتبة المكونات</SectionTitle>
        <Card className="mb-8">
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p>
              تتضمن مكتبة المكونات مجموعة شاملة من العناصر المرئية القابلة لإعادة الاستخدام. تم تصميم هذه المكونات لتوفير تجربة مستخدم متسقة وسهلة الاستخدام عبر جميع أنحاء التطبيق.
            </p>
          </div>
          
          <div className="flex overflow-x-auto mb-6 pb-2">
            {componentTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveComponentsTab(tab.id)}
                className={`px-4 py-2 whitespace-nowrap ${
                  activeComponentsTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Alerts Section */}
          {activeComponentsTab === 'alerts' && (
            <div>
              <SubsectionTitle>التنبيهات</SubsectionTitle>
              <div className="space-y-4 mb-8">
                <Alert 
                  variant="info"
                  title="معلومات"
                >
                  هذا تنبيه معلوماتي يستخدم لإخبار المستخدم بمعلومات مهمة.
                </Alert>
                
                <Alert 
                  variant="success"
                  title="تم بنجاح"
                >
                  تم إنشاء طلبك بنجاح! يمكنك متابعة حالة الطلب من صفحة الطلبات.
                </Alert>
                
                <Alert 
                  variant="warning"
                  title="انتبه"
                >
                  هناك مشكلة في معالجة طلبك. يرجى التحقق من المعلومات المدخلة.
                </Alert>
                
                <Alert 
                  variant="error"
                  title="خطأ"
                  onClose={() => {}}
                >
                  حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى لاحقًا.
                </Alert>
              </div>
              
              <SubsectionTitle>تنبيهات العرض المؤقت</SubsectionTitle>
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="mb-2">
                    <ComponentLabel>رسالة نجاح</ComponentLabel>
                  </div>
                  <div className="flex items-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border-r-4 border-green-500 shadow-md mb-4">
                    <div className="ml-3 flex-shrink-0">
                      <Check size={20} className="text-green-600 dark:text-green-400" />
                    </div>
                    <div className="mr-3 flex-1">
                      <div className="font-bold">تم بنجاح!</div>
                      <div>تم إنشاء طلبك وسيتم إخطارك عندما يتلقى عروضًا.</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button size="sm">عرض تنبيه النجاح</Button>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="mb-2">
                    <ComponentLabel>إشعار منبثق</ComponentLabel>
                  </div>
                  <div className="flex items-start p-4 rounded-lg bg-white dark:bg-gray-700 shadow-lg border border-gray-200 dark:border-gray-600 mb-4">
                    <div className="ml-3 flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <Bell size={18} className="text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="mr-3 flex-1">
                      <div className="font-bold mb-1">تلقيت عرضًا جديدًا!</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        قام أحمد بتقديم عرض لتوصيل طلبك بقيمة 80 ج.م.
                      </div>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button size="sm" variant="outline">تجاهل</Button>
                        <Button size="sm">عرض التفاصيل</Button>
                      </div>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button size="sm">عرض إشعار منبثق</Button>
                  </div>
                </div>
              </div>
              
              <SubsectionTitle>إرشادات استخدام التنبيهات</SubsectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800/50 rounded-lg">
                  <h4 className="font-bold mb-2 flex items-center">
                    <Check size={16} className="ml-1 text-green-500" />
                    افعل
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5 ml-2">
                        <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      </div>
                      <span>استخدم التنبيهات لإبلاغ المستخدم بمعلومات مهمة</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5 ml-2">
                        <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      </div>
                      <span>احرص على وضوح الرسالة واختصارها</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5 ml-2">
                        <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      </div>
                      <span>وفر خيارات مناسبة للإجراءات عند الحاجة</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800/50 rounded-lg">
                  <h4 className="font-bold mb-2 flex items-center">
                    <X size={16} className="ml-1 text-red-500" />
                    لا تفعل
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5 ml-2">
                        <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      </div>
                      <span>لا تستخدم التنبيهات بشكل مفرط</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5 ml-2">
                        <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      </div>
                      <span>تجنب استخدام رسائل طويلة في التنبيهات</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5 ml-2">
                        <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      </div>
                      <span>لا تستخدم التنبيهات للمعلومات غير المهمة</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Badges Section */}
          {activeComponentsTab === 'badges' && (
            <div>
              <SubsectionTitle>الشارات</SubsectionTitle>
              <div className="space-y-6 mb-8">
                <div>
                  <ComponentLabel>أنواع الشارات</ComponentLabel>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge>افتراضي</Badge>
                    <Badge variant="primary">أساسي</Badge>
                    <Badge variant="success">ناجح</Badge>
                    <Badge variant="warning">تحذير</Badge>
                    <Badge variant="danger">خطأ</Badge>
                    <Badge variant="purple">مميز</Badge>
                  </div>
                </div>
                
                <div>
                  <ComponentLabel>شارات مع أيقونات</ComponentLabel>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="primary" className="flex items-center">
                      <Clock size={12} className="ml-1" />
                      قيد الانتظار
                    </Badge>
                    <Badge variant="success" className="flex items-center">
                      <Check size={12} className="ml-1" />
                      مكتمل
                    </Badge>
                    <Badge variant="warning" className="flex items-center">
                      <AlertTriangle size={12} className="ml-1" />
                      تحذير
                    </Badge>
                    <Badge variant="danger" className="flex items-center">
                      <X size={12} className="ml-1" />
                      ملغي
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <ComponentLabel>أشكال الشارات</ComponentLabel>
                  <div className="flex flex-wrap gap-2">
                    <Badge rounded="full">مستدير</Badge>
                    <Badge rounded="lg">دائري متوسط</Badge>
                    <Badge rounded="md">دائري صغير</Badge>
                  </div>
                </div>
                
                <div>
                  <ComponentLabel>شارات الحالة</ComponentLabel>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
                    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm">حالة الطلب:</span>
                      <Badge variant="warning">قيد الانتظار</Badge>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm">حالة الدفع:</span>
                      <Badge variant="success">تم الدفع</Badge>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm">حالة التوصيل:</span>
                      <Badge variant="primary">قيد التوصيل</Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <ComponentLabel>شارات العدد</ComponentLabel>
                  <div className="flex gap-6 items-center">
                    <div className="relative">
                      <Button variant="secondary" iconStart={<Bell size={16} />}>
                        الإشعارات
                      </Button>
                      <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                        3
                      </div>
                    </div>
                    
                    <div className="relative">
                      <Button variant="outline" iconStart={<MessageSquare size={16} />}>
                        الرسائل
                      </Button>
                      <div className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center">
                        5
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <User size={18} className="text-gray-600 dark:text-gray-300" />
                      </div>
                      <div className="absolute top-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <SubsectionTitle>استخدامات الشارات</SubsectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <ComponentLabel>عرض الحالة</ComponentLabel>
                  <Card>
                    <div className="flex justify-between items-start mb-4">
                      <div className="font-medium">توصيل طلب لابتوب</div>
                      <Badge variant="primary">قيد التوصيل</Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
                      <MapPin size={14} className="ml-1" />
                      <span>المعادي ➡️ مدينة نصر</span>
                    </div>
                  </Card>
                </div>
                
                <div>
                  <ComponentLabel>تسليط الضوء على ميزات</ComponentLabel>
                  <Card>
                    <div className="flex justify-between items-start mb-4">
                      <div className="font-medium">أحمد علي</div>
                      <Badge variant="purple" className="flex items-center">
                        <Star size={12} className="ml-1" />
                        مندوب متميز
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      مندوب نشط منذ 6 أشهر
                    </div>
                  </Card>
                </div>
                
                <div>
                  <ComponentLabel>عرض الأولوية</ComponentLabel>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span>توصيل عاجل</span>
                      <Badge variant="danger">عالي</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span>توصيل مستندات</span>
                      <Badge variant="warning">متوسط</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span>توصيل عادي</span>
                      <Badge variant="primary">عادي</Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <ComponentLabel>تصنيف المحتوى</ComponentLabel>
                  <div className="space-y-2">
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Badge className="ml-2">عام</Badge>
                      <span>قواعد استخدام المنصة</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Badge variant="purple" className="ml-2">مميز</Badge>
                      <span>نصائح توفير الوقت في التوصيل</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Badge variant="success" className="ml-2">جديد</Badge>
                      <span>تحديث ميزات المنصة</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Avatars Section */}
          {activeComponentsTab === 'avatars' && (
            <div>
              <SubsectionTitle>الصور الشخصية</SubsectionTitle>
              <div className="space-y-6 mb-8">
                <div>
                  <ComponentLabel>أحجام الصور الشخصية</ComponentLabel>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <Avatar size="xs" letter="أ" />
                    <Avatar size="sm" letter="ب" />
                    <Avatar size="md" letter="ج" />
                    <Avatar size="lg" letter="د" />
                    <Avatar size="xl" letter="هـ" />
                  </div>
                </div>
                
                <div>
                  <ComponentLabel>أنواع الصور الشخصية</ComponentLabel>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar size="lg" letter="أ" />
                      <span className="text-sm">بالحرف الأول</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar size="lg" src="https://randomuser.me/api/portraits/men/32.jpg" alt="صورة شخصية" />
                      <span className="text-sm">بصورة شخصية</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                        ع
                      </div>
                      <span className="text-sm">مخصص</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <ComponentLabel>حالات المستخدمين</ComponentLabel>
                  <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar letter="أ" status="online" />
                      <span className="text-xs">متصل</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar letter="ب" status="away" />
                      <span className="text-xs">غير متواجد</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar letter="ج" status="busy" />
                      <span className="text-xs">مشغول</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar letter="د" status="offline" />
                      <span className="text-xs">غير متصل</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <ComponentLabel>مجموعات الصور الشخصية</ComponentLabel>
                  <div className="flex rtl:space-x-reverse -space-x-2">
                    <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" alt="صورة شخصية" className="border-2 border-white dark:border-gray-800" />
                    <Avatar src="https://randomuser.me/api/portraits/women/32.jpg" alt="صورة شخصية" className="border-2 border-white dark:border-gray-800" />
                    <Avatar letter="ج" className="border-2 border-white dark:border-gray-800" />
                    <Avatar letter="د" className="border-2 border-white dark:border-gray-800" />
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 text-sm">
                      +3
                    </div>
                  </div>
                </div>
                
                <div>
                  <ComponentLabel>صور شخصية مع معلومات</ComponentLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Avatar size="lg" letter="أ" className="ml-4" />
                      <div>
                        <div className="font-bold">أحمد محمد</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">مندوب</div>
                        <div className="flex items-center mt-1">
                          <Star size={16} className="text-amber-400 ml-1" />
                          <span>4.8</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Avatar size="lg" letter="س" className="ml-4" />
                      <div className="flex-1">
                        <div className="font-bold">سارة أحمد</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">عميل</div>
                      </div>
                      <Badge variant="purple">VIP</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <SubsectionTitle>استخدامات الصور الشخصية</SubsectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <ComponentLabel>بطاقة ملف شخصي</ComponentLabel>
                  <Card>
                    <div className="flex items-center">
                      <Avatar size="xl" letter="م" className="ml-4" />
                      <div>
                        <div className="font-bold text-lg">محمد علي</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">مندوب توصيل</div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Badge variant="success" className="flex items-center">
                            <ThumbsUp size={12} className="ml-1" />
                            <span>98%</span>
                          </Badge>
                          <Badge variant="primary">187 توصيلة</Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div>
                  <ComponentLabel>قائمة المحادثات</ComponentLabel>
                  <div className="space-y-2">
                    <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <Avatar size="md" letter="أ" status="online" className="ml-3" />
                      <div className="flex-1">
                        <div className="font-medium">أحمد محمد</div>
                        <div className="text-xs text-gray-600 dark:text-gray-300 truncate">مرحبا، هل يمكنني الاستفسار عن...</div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">الآن</div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Avatar size="md" letter="س" status="offline" className="ml-3" />
                      <div className="flex-1">
                        <div className="font-medium">سارة أحمد</div>
                        <div className="text-xs text-gray-600 dark:text-gray-300 truncate">شكرًا لك على التوصيل السريع!</div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">أمس</div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Avatar size="md" letter="ك" status="away" className="ml-3" />
                      <div className="flex-1">
                        <div className="font-medium">كريم محمود</div>
                        <div className="text-xs text-gray-600 dark:text-gray-300 truncate">هل ما زال الطلب متاحًا؟</div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">2 يناير</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Navigation Elements Section */}
          {activeComponentsTab === 'navigation' && (
            <div>
              <SubsectionTitle>عناصر التنقل</SubsectionTitle>
              <div className="space-y-6 mb-8">
                <div>
                  <ComponentLabel>شريط تنقل علوي</ComponentLabel>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className={`h-16 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg px-4 flex items-center justify-between`}>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white ml-3">
                          <Truck size={20} />
                        </div>
                        <div className="font-bold">توصيل سهل</div>
                      </div>
                      
                      <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
                        <a href="#" className="text-blue-600 dark:text-blue-400 font-medium">الرئيسية</a>
                        <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">الطلبات</a>
                        <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">المناديب</a>
                        <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">حول المنصة</a>
                      </div>
                      
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
                          <Sun size={18} className="text-gray-600 dark:text-gray-300" />
                        </button>
                        <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
                          <Bell size={18} className="text-gray-600 dark:text-gray-300" />
                        </button>
                        <Avatar letter="أ" size="sm" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <ComponentLabel>شريط تنقل سفلي</ComponentLabel>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className={`h-16 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg flex items-center justify-around`}>
                      <div className="flex flex-col items-center">
                        <Home size={20} className="text-blue-600" />
                        <span className="text-xs font-medium text-blue-600 mt-1">الرئيسية</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <Package size={20} className="text-gray-500 dark:text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">طلباتي</span>
                      </div>
                      
                      <div className="flex items-center justify-center -mt-8">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                          <Plus size={24} />
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <MessageSquare size={20} className="text-gray-500 dark:text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">الرسائل</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <User size={20} className="text-gray-500 dark:text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">حسابي</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <ComponentLabel>شريط تنقل جانبي</ComponentLabel>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex h-96">
                      <div className={`w-16 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-l ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-r-lg py-6 flex flex-col items-center justify-between`}>
                        <div>
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mb-6">
                            <Truck size={20} />
                          </div>
                          
                          <div className="flex flex-col items-center space-y-6">
                            <button className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                              <Home size={20} />
                            </button>
                            <button className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                              <Package size={20} />
                            </button>
                            <button className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                              <MessageSquare size={20} />
                            </button>
                            <button className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                              <Map size={20} />
                            </button>
                            <button className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                              <User size={20} />
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <button className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                            <Settings size={20} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex-1 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg ml-4">
                        {/* Empty content area */}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <ComponentLabel>عرض علامات التبويب</ComponentLabel>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-4`}>
                      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                        <button className="px-4 py-2 border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium">
                          الحالية
                        </button>
                        <button className="px-4 py-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                          المكتملة
                        </button>
                        <button className="px-4 py-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                          الملغاة
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-center h-32 border border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                        <span className="text-gray-500 dark:text-gray-400">محتوى التبويب النشط</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <ComponentLabel>فتات الخبز (Breadcrumbs)</ComponentLabel>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center text-sm">
                      <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                        الرئيسية
                      </a>
                      <ChevronLeft size={16} className="mx-2 text-gray-400" />
                      <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                        الطلبات
                      </a>
                      <ChevronLeft size={16} className="mx-2 text-gray-400" />
                      <span className="text-gray-900 dark:text-white font-medium">
                        تفاصيل الطلب #12345
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <ComponentLabel>قائمة منسدلة</ComponentLabel>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="relative inline-block">
                      <Button 
                        variant="outline" 
                        iconEnd={<ChevronDown size={16} />}
                      >
                        إجراءات
                      </Button>
                      
                      <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} z-10`}>
                        <div className="py-1">
                          <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Edit size={16} className="ml-2 text-gray-500 dark:text-gray-400" />
                            تعديل
                          </a>
                          <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Share size={16} className="ml-2 text-gray-500 dark:text-gray-400" />
                            مشاركة
                          </a>
                          <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Download size={16} className="ml-2 text-gray-500 dark:text-gray-400" />
                            تنزيل
                          </a>
                          <hr className="my-1 border-gray-200 dark:border-gray-700" />
                          <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Trash size={16} className="ml-2 text-red-600 dark:text-red-400" />
                            حذف
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <SubsectionTitle>مكونات التنقل المتخصصة</SubsectionTitle>
              <div className="space-y-6">
                <div>
                  <ComponentLabel>شريط البحث</ComponentLabel>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="relative max-w-md">
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Search size={18} className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className={`w-full py-3 pr-10 pl-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                        placeholder="ابحث عن الطلبات..."
                        dir="rtl"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <ComponentLabel>الصفحات (Pagination)</ComponentLabel>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-center">
                      <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 mr-2">
                        <ChevronRight size={16} />
                      </button>
                      
                      <button className="px-3 py-1 rounded-lg bg-blue-500 text-white mr-2">
                        1
                      </button>
                      <button className="px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 mr-2">
                        2
                      </button>
                      <button className="px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 mr-2">
                        3
                      </button>
                      
                      <span className="mx-2 text-gray-500 dark:text-gray-400">...</span>
                      
                      <button className="px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 mr-2">
                        10
                      </button>
                      
                      <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                        <ChevronLeft size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <ComponentLabel>شريط تقدم</ComponentLabel>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="max-w-md mx-auto">
                      <div className="flex justify-between mb-2">
                        <div className="text-sm font-medium">مراحل الطلب</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">2/4 مكتمل</div>
                      </div>
                      
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full w-1/2 bg-blue-500 rounded-full"></div>
                      </div>
                      
                      <div className="flex justify-between mt-2">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                            1
                          </div>
                          <span className="mr-2 text-xs">التفاصيل</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                            2
                          </div>
                          <span className="mr-2 text-xs">الموقع</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 text-xs">
                            3
                          </div>
                          <span className="mr-2 text-xs">التسعير</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 text-xs">
                            4
                          </div>
                          <span className="mr-2 text-xs">التأكيد</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Feedback Section */}
          {activeComponentsTab === 'feedback' && (
            <div>
              <SubsectionTitle>عناصر التغذية الراجعة</SubsectionTitle>
              <div className="space-y-6 mb-8">
                <div>
                  <ComponentLabel>التقييم بالنجوم</ComponentLabel>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex flex-col items-center">
                      <div className="text-center mb-4">
                        <div className="font-bold mb-1">قيّم تجربتك مع المندوب</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">كيف كانت تجربتك مع المندوب أحمد؟</div>
                      </div>
                      
                      <div className="flex space-x-1 rtl:space-x-reverse mb-4">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button key={rating} className="focus:outline-none">
                            <Star
                              size={32}
                              className={rating <= 4 ? "text-amber-400 fill-amber-400" : "text-gray-300 dark:text-gray-600"}
                            />
                          </button>
                        ))}
                      </div>
                      
                      <div className="w-full max-w-sm">
                        <div className="mb-3">
                          <textarea
                            className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                            rows="3"
                            placeholder="اكتب تعليقًا (اختياري)"
                            dir="rtl"
                          ></textarea>
                        </div>
                        
                        <Button fullWidth>إرسال التقييم</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <ComponentLabel>مقياس الرضا</ComponentLabel>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex flex-col items-center">
                      <div className="text-center mb-4">
                        <div className="font-bold mb-1">ما مدى رضاك عن خدمتنا؟</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">اختر الخيار الذي يناسب تجربتك</div>
                      </div>
                      
                      <div className="flex w-full max-w-md justify-between mb-6">
                        <button className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 dark:text-red-400 mb-2">
                            😞
                          </div>
                          <span className="text-xs">غير راضٍ</span>
                        </button>
                        
                        <button className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500 dark:text-orange-400 mb-2">
                            😐
                          </div>
                          <span className="text-xs">محايد</span>
                        </button>
                        
                        <button className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-500 dark:text-yellow-400 mb-2">
                            🙂
                          </div>
                          <span className="text-xs">راضٍ</span>
                        </button>
                        
                        <button className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500 dark:text-green-400 mb-2">
                            😀
                          </div>
                          <span className="text-xs">راضٍ جدًا</span>
                        </button>
                        
                        <button className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 dark:text-blue-400 mb-2">
                            🤩
                          </div>
                          <span className="text-xs">ممتاز</span>
                        </button>
                      </div>
                      
                      <Button size="sm">إرسال</Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <ComponentLabel>نماذج التغذية الراجعة</ComponentLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="mb-4">
                        <div className="font-bold mb-2">تقييم التوصيل</div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <input type="checkbox" className="ml-2 h-4 w-4 text-blue-600 rounded" />
                            <label>التوصيل كان سريعًا</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="ml-2 h-4 w-4 text-blue-600 rounded" />
                            <label>المندوب كان ودودًا</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="ml-2 h-4 w-4 text-blue-600 rounded" />
                            <label>الطلب وصل بحالة جيدة</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" className="ml-2 h-4 w-4 text-blue-600 rounded" />
                            <label>المندوب التزم بالمواعيد</label>
                          </div>
                        </div>
                      </div>
                      
                      <Button size="sm">إرسال</Button>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="mb-4">
                        <div className="font-bold mb-2">مقياس توصية</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                          ما مدى احتمالية أن توصي بخدمتنا لأصدقائك؟
                        </div>
                        
                        <div className="flex justify-between mb-2">
                          <span className="text-xs">غير محتمل</span>
                          <span className="text-xs">محتمل جدًا</span>
                        </div>
                        
                        <div className="flex space-x-1 rtl:space-x-reverse">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <button
                              key={num}
                              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                num <= 6
                                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                  : num <= 8
                                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                  : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <Button size="sm">إرسال</Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <ComponentLabel>مؤشرات الحالة</ComponentLabel>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm font-medium">جاري التحميل...</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">60%</div>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full w-3/5 bg-blue-500 rounded-full">
                          <div className="animate-progress-pulse w-full h-full bg-blue-400 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <SubsectionTitle>أمثلة على استخدام التغذية الراجعة</SubsectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <ComponentLabel>نموذج تقييم مندوب</ComponentLabel>
                  <Card>
                    <div className="flex items-center mb-4">
                      <Avatar size="lg" letter="أ" className="ml-4" />
                      <div>
                        <div className="font-bold text-lg">أحمد محمد</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">مندوب توصيل</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="font-medium mb-2">قيّم المندوب</div>
                      <div className="flex space-x-1 rtl:space-x-reverse mb-4">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button key={rating} className="focus:outline-none">
                            <Star
                              size={24}
                              className={rating <= 4 ? "text-amber-400 fill-amber-400" : "text-gray-300 dark:text-gray-600"}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center">
                        <input type="checkbox" className="ml-2 h-4 w-4 text-blue-600 rounded" defaultChecked />
                        <label className="text-sm">كان المندوب مهذباً</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="ml-2 h-4 w-4 text-blue-600 rounded" defaultChecked />
                        <label className="text-sm">وصل في الوقت المحدد</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="ml-2 h-4 w-4 text-blue-600 rounded" defaultChecked />
                        <label className="text-sm">كانت حالة الطلب جيدة</label>
                      </div>
                    </div>
                    
                    <textarea
                      className={`w-full p-3 mb-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                      rows="2"
                      placeholder="إضافة تعليق (اختياري)"
                      dir="rtl"
                    ></textarea>
                    
                    <Button fullWidth>إرسال التقييم</Button>
                  </Card>
                </div>
                
                <div>
                  <ComponentLabel>إنجازات المستخدم</ComponentLabel>
                  <Card>
                    <div className="flex justify-between items-start mb-4">
                      <div className="font-bold text-lg">إنجازاتك</div>
                      <Badge variant="purple">3/8 مكتملة</Badge>
                    </div>
                    
                    <div className="space-y-4 mb-4">
                      <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 ml-3">
                          <Award size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">أول طلب</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">أكملت أول طلب توصيل بنجاح!</div>
                        </div>
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                          <Check size={16} />
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 ml-3">
                          <Star size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">تقييم 5 نجوم</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">حصلت على تقييم 5 نجوم من عميل!</div>
                        </div>
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                          <Check size={16} />
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 ml-3">
                          <Share size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">مشاركة أول طلب</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">شاركت طلبك مع الآخرين!</div>
                        </div>
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                          <Check size={16} />
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg opacity-60">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 ml-3">
                          <Award size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">10 طلبات</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">أكمل 10 طلبات توصيل</div>
                        </div>
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                          <Lock size={16} />
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" fullWidth>عرض جميع الإنجازات</Button>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  };
  
  // Render Patterns Section
  const renderPatterns = () => {
    const patternTabs = [
      { id: 'request', label: 'إنشاء طلب' },
      { id: 'tracking', label: 'تتبع الطلب' },
      { id: 'sharing', label: 'مشاركة الطلب' },
      { id: 'offers', label: 'عروض المناديب' },
      { id: 'rating', label: 'التقييم' }
    ];
    
    return (
      <div>
        <SectionTitle>أنماط التصميم</SectionTitle>
        <Card className="mb-8">
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p>
              أنماط التصميم هي حلول متكررة لمشاكل شائعة في واجهة المستخدم. توفر هذه الأنماط تجربة مستخدم متسقة وسلسة عبر مختلف أجزاء التطبيق.
            </p>
          </div>
          
          <div className="flex overflow-x-auto mb-6 pb-2">
            {patternTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActivePatternsTab(tab.id)}
                className={`px-4 py-2 whitespace-nowrap ${
                  activePatternsTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Request Creation Pattern */}
          {activePatternsTab === 'request' && (
            <div>
              <SubsectionTitle>نمط إنشاء طلب</SubsectionTitle>
              <div className="space-y-6 mb-8">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="font-bold mb-4">الخطوة 1: تفاصيل الطلب</h3>
                  
                  <div className="flex justify-between mb-6">
                    <div className="flex-1 text-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-medium mb-2">1</div>
                      <div className="text-sm font-medium">تفاصيل الطلب</div>
                    </div>
                    <div className="w-full max-w-[100px] h-1 bg-gray-200 dark:bg-gray-700 self-center mx-2"></div>
                    <div className="flex-1 text-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-medium mb-2">2</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">مواقع التوصيل</div>
                    </div>
                    <div className="w-full max-w-[100px] h-1 bg-gray-200 dark:bg-gray-700 self-center mx-2"></div>
                    <div className="flex-1 text-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-medium mb-2">3</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">تفاصيل الدفع</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">عنوان الطلب</label>
                      <input
                        type="text"
                        className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                        placeholder="مثال: توصيل جهاز كمبيوتر محمول"
                        dir="rtl"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">نوع الطلب</label>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-center cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800">
                          <ShoppingBag size={24} className="mx-auto mb-1 text-blue-500" />
                          <div className="text-sm">ملابس</div>
                        </div>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-center cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700">
                          <Package size={24} className="mx-auto mb-1 text-gray-500 dark:text-gray-400" />
                          <div className="text-sm">طرد</div>
                        </div>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-center cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700">
                          <FileText size={24} className="mx-auto mb-1 text-gray-500 dark:text-gray-400" />
                          <div className="text-sm">مستندات</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">وصف الطلب (اختياري)</label>
                      <textarea
                        className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                        rows="3"
                        placeholder="أضف وصفًا للطلب..."
                        dir="rtl"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">إضافة صورة (اختياري)</label>
                      <div className={`border-2 border-dashed ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'} rounded-lg p-6 flex flex-col items-center justify-center`}>
                        <Upload size={24} className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`} />
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>اسحب وأفلت الصورة هنا، أو</p>
                        <Button size="sm" variant="outline">اختر ملف</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" disabled>رجوع</Button>
                    <Button iconEnd={<ArrowLeft size={16} />}>
                      التالي
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Tracking Pattern */}
          {activePatternsTab === 'tracking' && (
            <div>
              <SubsectionTitle>نمط تتبع الطلب</SubsectionTitle>
              <div className="space-y-6 mb-8">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 ml-4">
                        <Package size={24} />
                      </div>
                      <div>
                        <div className="font-bold">توصيل لابتوب</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">رقم الطلب: #12345</div>
                      </div>
                    </div>
                    <Badge variant="primary">قيد التوصيل</Badge>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <div className="text-sm font-medium">حالة الطلب</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">3/5 مكتمل</div>
                    </div>
                    
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-3/5 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="font-medium mb-3">مراحل التوصيل</div>
                    <div className="space-y-6">
                      <div className="flex">
                        <div className="flex flex-col items-center ml-4">
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                            <Check size={16} />
                          </div>
                          <div className="flex-1 w-px bg-gray-300 dark:bg-gray-600 my-2"></div>
                        </div>
                        <div>
                          <div className="font-medium">تم تأكيد الطلب</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">تم تأكيد طلبك بنجاح</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">10:30 صباحًا</div>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex flex-col items-center ml-4">
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                            <Check size={16} />
                          </div>
                          <div className="flex-1 w-px bg-gray-300 dark:bg-gray-600 my-2"></div>
                        </div>
                        <div>
                          <div className="font-medium">تم قبول الطلب</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">قام أحمد بقبول طلبك للتوصيل</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">10:45 صباحًا</div>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex flex-col items-center ml-4">
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                            <Check size={16} />
                          </div>
                          <div className="flex-1 w-px bg-gray-300 dark:bg-gray-600 my-2"></div>
                        </div>
                        <div>
                          <div className="font-medium">تم استلام الطلب</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">قام المندوب باستلام الطلب من المتجر</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">11:15 صباحًا</div>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex flex-col items-center ml-4">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white animate-pulse">
                            <Truck size={16} />
                          </div>
                          <div className="flex-1 w-px bg-gray-300 dark:bg-gray-600 my-2"></div>
                        </div>
                        <div>
                          <div className="font-medium">جاري التوصيل</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">المندوب في الطريق إليك</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">الآن</div>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex flex-col items-center ml-4">
                          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400">
                            <Check size={16} />
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-500 dark:text-gray-400">تم التسليم</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">سيتم تحديث الحالة عند التسليم</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="font-medium mb-3">تتبع المندوب</div>
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <MapPin size={32} className="mx-auto mb-2 text-gray-500 dark:text-gray-400" />
                        <div className="text-sm text-gray-600 dark:text-gray-300">خريطة تتبع المندوب</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <div className="text-sm font-medium">الوقت المتوقع للوصول</div>
                        <div className="text-lg font-bold">20 دقيقة</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">المسافة المتبقية</div>
                        <div className="text-lg font-bold">4.5 كم</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline" fullWidth iconStart={<Phone size={16} />}>
                      اتصال بالمندوب
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Sharing Pattern */}
          {activePatternsTab === 'sharing' && (
            <div>
              <SubsectionTitle>نمط مشاركة الطلب</SubsectionTitle>
              <div className="space-y-6 mb-8">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="mb-6">
                    <div className="font-bold mb-4">مشاركة تفاصيل التوصيل</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      يمكنك مشاركة تفاصيل طلبك مع أشخاص آخرين ليتمكنوا من تتبع حالة الطلب.
                    </p>
                  </div>
                  
                  <Card className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 ml-3">
                          <Package size={20} />
                        </div>
                        <div>
                          <div className="font-medium">توصيل لابتوب</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300">رقم الطلب: #12345</div>
                        </div>
                      </div>
                      <Badge variant="primary">قيد التوصيل</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <MapPin size={14} className="ml-1 text-gray-500 dark:text-gray-400" />
                        <span>المعادي ➡️ مدينة نصر</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">الوصول المتوقع:</span>
                        <span className="font-medium mr-1">12:45 مساءً</span>
                      </div>
                    </div>
                  </Card>
                  
                  <div className="mb-6">
                    <div className="font-medium mb-3">رابط المشاركة</div>
                    <div className="flex">
                      <input
                        type="text"
                        className={`flex-1 p-3 rounded-r-lg border-r-0 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                        value="https://delivery.example.com/track/12345"
                        readOnly
                        dir="ltr"
                      />
                      <Button className="rounded-r-none">نسخ</Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <Button
                      variant="outline"
                      className="flex flex-col items-center py-4"
                      iconStart={<MessageSquare size={20} className="mb-1" />}
                    >
                      رسائل
                    </Button>
                    <Button
                      variant="outline"
                      className="flex flex-col items-center py-4"
                      iconStart={<Mail size={20} className="mb-1" />}
                    >
                      بريد إلكتروني
                    </Button>
                    <Button
                      variant="outline"
                      className="flex flex-col items-center py-4"
                      iconStart={<Share size={20} className="mb-1" />}
                    >
                      مشاركة
                    </Button>
                  </div>
                  
                  <div className="mb-6">
                    <div className="font-medium mb-3">مشاركة مع أشخاص محددين</div>
                    <div className="mb-3">
                      <div className="flex items-center mb-2">
                        <input
                          type="text"
                          className={`flex-1 p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                          placeholder="البريد الإلكتروني أو رقم الهاتف"
                          dir="rtl"
                        />
                        <Button className="mr-2">إضافة</Button>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        يمكنك إضافة عدة أشخاص بالفصل بينهم بفاصلة
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className={`p-3 rounded-lg flex items-center justify-between ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <div className="flex items-center">
                          <Avatar size="sm" letter="س" className="ml-2" />
                          <div>
                            <div className="text-sm font-medium">سارة أحمد</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">sara@example.com</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">إزالة</Button>
                      </div>
                      
                      <div className={`p-3 rounded-lg flex items-center justify-between ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <div className="flex items-center">
                          <Avatar size="sm" letter="م" className="ml-2" />
                          <div>
                            <div className="text-sm font-medium">محمد علي</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">+20 123 456 7890</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">إزالة</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline">إلغاء</Button>
                    <Button>مشاركة الطلب</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Offers Pattern */}
          {activePatternsTab === 'offers' && (
            <div>
              <SubsectionTitle>نمط عروض المناديب</SubsectionTitle>
              <div className="space-y-6 mb-8">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="mb-6">
                    <div className="font-bold mb-4">العروض المقدمة</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      تلقيت 3 عروض من المناديب لتوصيل طلبك. يمكنك مراجعة العروض واختيار المندوب المناسب.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-medium">تفاصيل الطلب</div>
                    <Badge variant="purple">3 عروض</Badge>
                  </div>
                  
                  <Card className="mb-6">
                    <div className="mb-4">
                      <div className="font-medium mb-1">توصيل لابتوب</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        جهاز لابتوب ماك بوك برو مع شاحن وحقيبة
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm mb-2">
                      <div className="flex items-center">
                        <MapPin size={14} className="ml-1 text-gray-500 dark:text-gray-400" />
                        <span>المعادي</span>
                      </div>
                      <ArrowRight size={14} className="text-gray-500 dark:text-gray-400" />
                      <div className="flex items-center">
                        <MapPin size={14} className="ml-1 text-gray-500 dark:text-gray-400" />
                        <span>مدينة نصر</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">المسافة</div>
                        <div className="font-medium">15 كم</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">الوزن</div>
                        <div className="font-medium">3 كجم</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">السعر المتوقع</div>
                        <div className="font-medium">70-100 ج.م</div>
                      </div>
                    </div>
                  </Card>
                  
                  <div className="space-y-4 mb-6">
                    <div className={`p-4 rounded-lg border ${darkMode ? 'border-blue-800 bg-blue-900/20' : 'border-blue-100 bg-blue-50'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Avatar size="md" letter="أ" className="ml-3" />
                          <div>
                            <div className="font-medium">أحمد محمد</div>
                            <div className="flex items-center">
                              <Star size={14} className="text-amber-400 ml-1" />
                              <span className="text-sm">4.8 (120 توصيلة)</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-center ml-4">
                          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">80 ج.م</div>
                          <Badge variant="primary" className="mt-1">الأفضل</Badge>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between mb-2 text-sm">
                          <div>وقت الوصول المتوقع:</div>
                          <div className="font-medium">30 دقيقة</div>
                        </div>
                        <div className="flex justify-between mb-2 text-sm">
                          <div>وسيلة النقل:</div>
                          <div className="font-medium">دراجة نارية</div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <div>موعد التسليم المقدر:</div>
                          <div className="font-medium">1:00 مساءً</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                        <Button variant="outline" size="sm">تفاصيل أكثر</Button>
                        <Button size="sm">قبول العرض</Button>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Avatar size="md" letter="م" className="ml-3" />
                          <div>
                            <div className="font-medium">محمود عبدالله</div>
                            <div className="flex items-center">
                              <Star size={14} className="text-amber-400 ml-1" />
                              <span className="text-sm">4.6 (95 توصيلة)</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-center ml-4">
                          <div className="text-lg font-bold">95 ج.م</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between mb-2 text-sm">
                          <div>وقت الوصول المتوقع:</div>
                          <div className="font-medium">20 دقيقة</div>
                        </div>
                        <div className="flex justify-between mb-2 text-sm">
                          <div>وسيلة النقل:</div>
                          <div className="font-medium">سيارة</div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <div>موعد التسليم المقدر:</div>
                          <div className="font-medium">12:45 مساءً</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                        <Button variant="outline" size="sm">تفاصيل أكثر</Button>
                        <Button size="sm">قبول العرض</Button>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Avatar size="md" letter="س" className="ml-3" />
                          <div>
                            <div className="font-medium">سمير خالد</div>
                            <div className="flex items-center">
                              <Star size={14} className="text-amber-400 ml-1" />
                              <span className="text-sm">4.5 (78 توصيلة)</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-center ml-4">
                          <div className="text-lg font-bold">100 ج.م</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between mb-2 text-sm">
                          <div>وقت الوصول المتوقع:</div>
                          <div className="font-medium">15 دقيقة</div>
                        </div>
                        <div className="flex justify-between mb-2 text-sm">
                          <div>وسيلة النقل:</div>
                          <div className="font-medium">دراجة نارية</div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <div>موعد التسليم المقدر:</div>
                          <div className="font-medium">12:30 مساءً</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                        <Button variant="outline" size="sm">تفاصيل أكثر</Button>
                        <Button size="sm">قبول العرض</Button>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" fullWidth>
                    إلغاء الطلب
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Rating Pattern */}
          {activePatternsTab === 'rating' && (
            <div>
              <SubsectionTitle>نمط التقييم</SubsectionTitle>
              <div className="space-y-6 mb-8">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-center mb-6">
                    <div className="font-bold text-lg mb-2">تم توصيل طلبك بنجاح!</div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      تم توصيل طلبك بواسطة أحمد محمد. يرجى تقييم تجربتك.
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                      <Check size={40} />
                    </div>
                    
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      تم التوصيل في
                    </div>
                    <div className="font-bold text-lg">
                      12:45 مساءً
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-6 mb-6">
                    <div className="flex items-center mb-6">
                      <Avatar size="lg" letter="أ" className="ml-4" />
                      <div>
                        <div className="font-bold text-lg">أحمد محمد</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">مندوب توصيل</div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="text-center mb-4">
                        <div className="font-medium mb-1">كيف كانت تجربتك مع المندوب؟</div>
                      </div>
                      
                      <div className="flex justify-center space-x-2 rtl:space-x-reverse mb-6">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button key={rating} className="focus:outline-none transform hover:scale-110 transition-transform">
                            <Star
                              size={32}
                              className={rating <= 4 ? "text-amber-400 fill-amber-400" : "text-gray-300 dark:text-gray-600"}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="font-medium">ما الذي أعجبك في الخدمة؟</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className={`p-2 border rounded-lg text-center cursor-pointer ${darkMode ? 'border-blue-800 bg-blue-900/20 text-blue-400' : 'border-blue-100 bg-blue-50 text-blue-600'}`}>
                          سرعة التوصيل
                        </div>
                        <div className={`p-2 border rounded-lg text-center cursor-pointer ${darkMode ? 'border-gray-700 hover:border-blue-800 hover:bg-blue-900/20 hover:text-blue-400' : 'border-gray-200 hover:border-blue-100 hover:bg-blue-50 hover:text-blue-600'}`}>
                          التعامل المهذب
                        </div>
                        <div className={`p-2 border rounded-lg text-center cursor-pointer ${darkMode ? 'border-gray-700 hover:border-blue-800 hover:bg-blue-900/20 hover:text-blue-400' : 'border-gray-200 hover:border-blue-100 hover:bg-blue-50 hover:text-blue-600'}`}>
                          حالة الطلب جيدة
                        </div>
                        <div className={`p-2 border rounded-lg text-center cursor-pointer ${darkMode ? 'border-gray-700 hover:border-blue-800 hover:bg-blue-900/20 hover:text-blue-400' : 'border-gray-200 hover:border-blue-100 hover:bg-blue-50 hover:text-blue-600'}`}>
                          الالتزام بالمواعيد
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="font-medium mb-2">أضف تعليقًا (اختياري)</div>
                      <textarea
                        className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                        rows="3"
                        placeholder="اكتب تعليقك هنا..."
                        dir="rtl"
                      ></textarea>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center">
                        <input type="checkbox" className="ml-2 h-4 w-4 text-blue-600 rounded" />
                        <label className="text-sm">إضافة إلى المفضلة للطلبات المستقبلية</label>
                      </div>
                    </div>
                    
                    <Button fullWidth>إرسال التقييم</Button>
                  </div>
                  
                  <div className="text-center">
                    <Button variant="link">تخطي التقييم</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  };
  
  // Main component render function
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} pt-8 px-4 pb-16`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">نظام تصميم منصة التوصيل</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        
        <div className="flex mb-8 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('components')}
            className={`px-4 py-3 ${
              activeTab === 'components'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            مكتبة المكونات
          </button>
          <button
            onClick={() => setActiveTab('patterns')}
            className={`px-4 py-3 ${
              activeTab === 'patterns'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            أنماط التصميم
          </button>
        </div>
        
        {activeTab === 'components' ? renderComponents() : renderPatterns()}
        
        <div className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>نظام التصميم العربي لمنصة التوصيل © 2023</p>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemFinalPart;