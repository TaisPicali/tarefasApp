import  {  FormGroup  }  from  '@angular/forms';

// Validador customizado para comparar dois campos
 // função de  exportação ComparaValidator ( controleNome : string ,  comparacaoNome : string )  {
    return  ( formGroup : FormGroup )  =>  {
        // Pega os campos conforme os nomes que foram passados
        const  controle  =  formGroup.controles [ controleNome ] ;
        const  comparacao  =  formGroup.controles [ comparacaoNome ] ;

        // Verifica se o primeiro campo atende todas as validações
        if  ( CONTROLE.erros )  {
            retorno ;
        }

        // Verifica se os campos são iguais
        if  ( controle.value !== comparacao.value )  {
            // Se não for, cria o erro "comparacao"
            comparacao . setErrors ( {  comparacao : true  } ) ;
        }  else  {
            // Caso contrário zera os erros.
            comparacao . setErrors ( null ) ;
        }
    } ;
}