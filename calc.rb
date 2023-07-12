#! /usr/bin/env ruby

def find_indexes_of_first_parens_group(str)
  stack = 0
  first_open = -1
  last_close = -1
  str.chars.each_with_index do |char, index|
    case char
    when '('
      first_open = index if stack == 0
      stack += 1
    when ')'
      stack -= 1
      if stack == 0
        last_close = index
        return [first_open, last_close]
      end
    end
  end
  raise
end

def index_of_next_expression(str)
  if match = str.match(%r{(\d*[*/]\d*)})
    start = str.index(match[1])
    finish = start + match[1].length - 1
    return [start, finish]
  end

  if match = str.match(/(\-?\d+[+\-]\-?\d+)/)
    start = str.index(match[1])
    finish = start + match[1].length - 1
    [start, finish]
  end
end

def calculate(str)
  # Imagine i did a match \d*[opperator]\d and then did
  # a big case statement depending on whichn operator
  eval(str).to_s
end

def insert_implied_operands(str)
  str.gsub(/\)\(/,")*(")
  # str.gsub(/(\d+)\(/,"$1*(")
end

def Calculator(str)
  str = insert_implied_operands(str)
  while str.match(/\(/)
    open, close = find_indexes_of_first_parens_group(str)
    first_char_of_expression = open + 1
    sub_str = str[first_char_of_expression...close]
    value = Calculator(sub_str)
    str[open..close] = value
  end


  while str.match(%r{\d+[*/\-+]\d+})
    puts "finding expression in #{str}"
    open, close = index_of_next_expression(str)
    puts "indexes: #{open} #{close}"
    sub_str = str[open..close]
    value = calculate(sub_str)
    puts "replacing #{sub_str} with #{value}"
    str[open..close] = value
  end
  str
end

puts Calculator("1+8-7*(12+100/2)*9-2")
