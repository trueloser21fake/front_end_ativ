function mascaraCPF(input) {
            // Remove tudo o que não é dígito
            let value = input.value.replace(/\D/g, '');

            // Limita o tamanho máximo a 11 dígitos
            if (value.length > 11) {
                value = value.substring(0, 11);
            }

            // Aplica a máscara: 000.000.000-00
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

            // Atualiza o valor do input
            input.value = value;
        }