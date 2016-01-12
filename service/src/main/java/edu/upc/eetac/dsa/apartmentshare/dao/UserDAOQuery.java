package edu.upc.eetac.dsa.apartmentshare.dao;

/**
 * Created by mazp on 30/11/15.
 */
public interface UserDAOQuery {
    public final static String UUID = "select REPLACE(UUID(),'-','')";
    public final static String CREATE_USER = "insert into users (id, loginid, password, fullname, email, phone) values (UNHEX(?), ?, UNHEX(MD5(?)), ?, ?, ?);";
    public final static String UPDATE_USER = "update users set loginid=?, fullname=?, email=?, phone=? where id=unhex(?)";
    public final static String ASSIGN_ROLE_REGISTERED = "insert into user_roles (userid, role) values (UNHEX(?), 'registered')";
    public final static String GET_USER_BY_ID = "select hex(u.id) as id, u.loginid, u.fullname, u.email, u.phone from users u where id=unhex(?)";
    public final static String GET_USER_BY_USERNAME = "select hex(u.id) as id, u.loginid, u.fullname, u.email, u.phone from users u where u.loginid=?";
    public final static String DELETE_USER = "delete from users where id=unhex(?)";
    public final static String GET_PASSWORD =  "select hex(password) as password from users where id=unhex(?)";
    public final static String CREATE_MSG = "insert into messages (id,fromuser,touser,text) values (unhex(?),unhex(?),unhex(?),?)";
    public final static String CHECK_MSGS ="select hex(fromuser) as fromuser, users.fullname as fromusername, count(*) as count,creation_timestamp from messages left join users ON users.id=messages.fromuser where touser=unhex(?) group by fromuser order by creation_timestamp desc";
    public final static String READ_MSGS ="select creation_timestamp, hex(fromuser) as fromuser, users.fullname as fromusername,hex(touser) as touser,text from messages left join users ON users.id=messages.fromuser where (touser=unhex(?) and fromuser=unhex(?)) or (touser=unhex(?) and fromuser=unhex(?)) order by creation_timestamp desc;";
}
