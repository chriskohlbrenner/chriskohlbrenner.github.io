class User < ActiveRecord::Base
  def send_bitcoin(recipient, amount, message)
    uri = # Coinbase API uri
    self.class.post(# uri with necessary params)
    debit_balance(amount)
    credit_balance(recipient, amount)
  end

  def request_bitcoin(recipient, amount, message)
    uri = # Coinbase API uri
    self.class.post(# uri with necessary params)
  end

  private
  def debit_balance(amount=default_amount)
    # ...
  end

  def credit_balance(recipient, amount=default_amount)
    # ...
  end

  def urlify(amount)
    # ...
  end

  def default_send_amount
    # ...
  end

  def default_request_amount
    # ...
  end

  def check_balance(amount)
    # ...
  end

  # ...Six other methods...

end